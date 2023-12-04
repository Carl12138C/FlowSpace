const { auth, client, db } = require("../setUp");
const firebaseAuth = require("firebase/auth");
const database = require("firebase/database");
const express = require("express");

const firebaseRouter = express.Router();

const TOKEN_MAP = new Map();

// firebaseRouter.use(function incoming(req, res, next) {
//     console.log('Current Time: ' + Date.now());
//     next();
// });
/**
// Example of using backend router.
// @param: 'route you want to go to'
// @param: callback function (req, res)
//              req = request from the user.
//              res = your response to the call.
*/
firebaseRouter.get("/user/:id", function incoming(req, res) {
    res.send("Hello " + req.params.id);
});

firebaseRouter.post("/login", async function incoming(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var username = req.body.username;
  try {
    const existingUsers = await client.queryUsers({
      id: { $eq: username },
    });
    if (existingUsers.users.length == 0) {
      return res.status(400).send("Invalid Username");
    }

    const loginUser = await firebaseAuth.signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const token = client.createToken(username);
    TOKEN_MAP.set(token, username);

    return res.json({
      user: loginUser.user,
      streamToken: token,
      errorCode: "",
      errorMessage: "",
    });
  } catch (error) {
    return res.json({
      user: "",
      errorCode: error.code,
      errorMessage: error.message,
    });
  }
});

firebaseRouter.post("/signup", async function incoming(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var username = req.body.username;
  try {
    const existingUsers = await client.queryUsers({
      id: { $eq: username },
    });
    if (existingUsers.users.length > 0) {
      return res.status(400).send("UserID taken");
    }

    const newUser = await firebaseAuth.createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    client.upsertUser({ id: username, name: username });
    const token = client.createToken(username);
    const channel = client.channel(
      "messaging",
      "personal-channel" + newUser.user.uid,
      {
        members: [username],
        name: "Personnel Channel",
        created_by_id: username,
      }
    );
    await channel.create();

    TOKEN_MAP.set(token, username);

    return res.json({
      user: newUser.user,
      streamToken: token,
      errorCode: "",
      errorMessage: "",
    });
  } catch (error) {
    return res.json({
      user: "",
      errorCode: error.code,
      errorMessage: error.message,
    });
  }
});

firebaseRouter.post("/registerdata", async function (req, res) {
  var reference = database.ref(db, "users/" + req.body.uid);
  database.set(reference, { friendslist: [] });
  reference = database.ref(db, "tasklist/" + req.body.uid);
  database.set(reference, { tasklist: [] });
  return res.status(201).json();
});

firebaseRouter.get("/getuserdata", async function incoming(req, res) {
    const reference = database.ref(db);
    database
        .get(database.child(reference, "users/" + req.query.uid))
        .then((snapshot) => {
            if (snapshot.exists()) {
                return res.status(200).json({ data: snapshot.val() });
            } else {
                console.log("No data available");
                return res.status(204).json({ data: null });
            }
        })
        .catch((error) => {
            console.error(error);
            next(error);
        });
});

firebaseRouter.put("/updatetask", async function (req, res) {
  const reference = database.ref(db, "tasklist/" + req.body.uid);
  database.set(reference, req.body.data);
  return res.status(201).json();
});

firebaseRouter.get("/getusertask", async function incoming(req, res) {
    const reference = database.ref(db);
    database
        .get(database.child(reference, "tasklist/" + req.query.uid))
        .then((snapshot) => {
            if (snapshot.exists()) {
                return res.status(200).json({ data: snapshot.val() });
            } else {
                console.log("No data available");
                return res.status(204).json({ data: null });
            }
        })
        .catch((error) => {
            console.error(error);
            next(error);
        });
});

firebaseRouter.get("/friends", async function incoming(req, res) {
    const reference = database.ref(db);
    database
        .get(
            database.child(reference, "users/" + req.query.uid + "/friendslist")
        )
        .then((snapshot) => {
            if (snapshot.exists()) {
                return res.status(200).json({ data: snapshot.val() });
            } else {
                console.log("No data available");
                return res.status(204).json({ data: null });
            }
        })
        .catch((error) => {
            console.error(error);
            next(error);
        });
});

firebaseRouter.post("/friends/add", async function incoming(req, res) {
    var reference = database.ref(db, "users/" + req.body.uid + "/friendslist");

    const existingUsers = await client.queryUsers({
        id: { $eq: req.body.data.friendName },
    });
    if (existingUsers.users.length == 0) {
        return res.status(400).send("User doesn't exist");
    }

    database
        .get(database.child(reference, "/" + req.body.data.friendName))
        .then((snapshot) => {
            if (snapshot.exists()) {
                if (snapshot.val()) {
                    return res.status(403).send("Friend Already Added");
                }
            } else {
                var data = {};
                data[req.body.data.friendName] = true;
                database.update(reference, data);
                return res.status(201).send("Successfully added");
            }
        })
        .catch((error) => {
            console.error(error);
            next(error);
        });
});

firebaseRouter.post("/logout", async function incoming(req, res) {
    var token = req.body.token;
    const id = TOKEN_MAP.get(token);

    if (id == null) return res.send("ID is not logged in.");
    await client.revokeUserToken(id, new Date());

    return res.status(200).json({ message: "Successfully Logged Out" });
});

module.exports = firebaseRouter;
