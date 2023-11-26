const express = require('express');
const firebaseRouter = require('./router/firebase.js');
const streamAPIRouter = require('./router/streamapi.js');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: "http://localhost:5173"
}

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use('/firebase', firebaseRouter);
app.use('/streamapi', streamAPIRouter);

app.listen('3000', function callBack() {
    console.log('Server live on http://localhost:3000');
});