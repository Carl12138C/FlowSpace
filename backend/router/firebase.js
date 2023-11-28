const { auth, client, db } = require("../setUp");
const firebaseAuth = require("firebase/auth");
const database = require("firebase/database");
const express = require("express");

const firebaseRouter = express.Router();

const TOKEN_MAP = new Map();

const auth = firebaseAuth.getAuth(app);
const db = database.getDatabase();

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
    database.set(reference, { friendslist: [{ default: "default" }] });
    reference = database.ref(db, "tasklist/" + req.body.uid);
    database.set(reference, { tasklist: [{ default: "default" }] });
    return;
});

firebaseRouter.get("/getuserdata", async function incoming(req, res) {
    const reference = database.ref(db, "users/" + req.query.uid);
    database.onValue(reference, (snapshot) => {
        const data = snapshot.val();
        return res.json({ data: data });
    });
});

firebaseRouter.put("/updatetask", async function (req, res) {
    const reference = database.ref(db, "tasklist/" + req.body.uid);
    database.set(reference, req.body.data);
    return;
});

firebaseRouter.get("/getusertask", async function incoming(req, res) {
    const reference = database.ref(db, "tasklist/" + req.query.uid);
    database.onValue(reference, (snapshot) => {
        const data = snapshot.val();
        return res.json({ data: data });
    });
});

firebaseRouter.post("/logout", async function incoming(req, res) {
    var token = req.body.token;

    const id = TOKEN_MAP.get(token);
    if (id == null) return res.send("ID is not logged in.");
    await client.revokeUserToken(id, new Date());

    return;
});

module.exports = firebaseRouter;
