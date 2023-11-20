
require('dotenv').config();
const express = require('express')
// import { initializeApp } from 'firebase';
const firebase = require('firebase/app');

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
firebaseRouter.get('/user/:id', function incoming(req, res) {
    res.send('Hello ' + req.params.id);
});


module.exports = firebaseRouter;
