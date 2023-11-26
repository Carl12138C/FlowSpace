require("dotenv").config();
const express = require("express");
// import { initializeApp } from 'firebase';
const firebase = require("firebase/app");
const firebaseAuth = require("firebase/auth");

const firebaseRouter = express.Router();

const app = firebase.initializeApp({
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
});

const auth = firebaseAuth.getAuth(app);
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
    try {
        const loginUser = await firebaseAuth.signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        res.json({user: loginUser.user, errorCode: "", errorMessage: "" });
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.json({user: "", errorCode: errorCode, errorMessage: errorMessage });
    }
});

firebaseRouter.post("/signup", async function incoming(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    try {
        const newUser = await firebaseAuth.createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        res.json({user: newUser.user, errorCode: "", errorMessage: "" });
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.json({user: "", errorCode: errorCode, errorMessage: errorMessage });
    }
});

module.exports = firebaseRouter;
