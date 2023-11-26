const { auth, client } = require("../setUp");
const firebaseAuth = require("firebase/auth");
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
        const loginUser = await firebaseAuth.signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        //TODO - grab username from databse and use that instead
        const token = client.createToken(username);
        TOKEN_MAP.set(token, username);

        res.json({
            user: loginUser.user,
            token: token,
            errorCode: "",
            errorMessage: "",
        });
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.json({
            user: "",
            errorCode: errorCode,
            errorMessage: errorMessage,
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

        client.upsertUser({ id: username, name: email });
        const token = client.createToken(username);
        console.log(token);
        const channel = client.channel("messaging", "personal-channel" + newUser.user.uid, {members: [username], name: "Personnel Channel", created_by_id: username })
        await channel.create()

        TOKEN_MAP.set(token, username);

        res.json({
            user: newUser.user,
            token: token,
            errorCode: "",
            errorMessage: "",
        });
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        res.json({
            user: "",
            errorCode: errorCode,
            errorMessage: errorMessage,
        });
    }
});

firebaseRouter.post("/logout", async function incoming(req, res) {
    var token = req.body.token;

    const id = TOKEN_MAP.get(token);
    if(id == null) return res.send("ID is not logged in.")
    await client.revokeUserToken(id, new Date());
})

module.exports = firebaseRouter;
