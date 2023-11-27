require("dotenv").config();
const firebase = require("firebase/app");
const firebaseAuth = require("firebase/auth");
const database = require("firebase/database");
const StreamChat = require("stream-chat").StreamChat;

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

const client = StreamChat.getInstance(
    process.env.streamKey,
    process.env.streamSecretKey
);

const db = database.getDatabase();

module.exports = {auth ,client, db}
