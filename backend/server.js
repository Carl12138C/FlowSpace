const express = require('express');
const firebaseRouter = require('./router/firebase.js');
const streamAPIRouter = require('./router/streamapi.js')

const app = express();

app.use('/firebase', firebaseRouter);
app.use('streamapi', streamAPIRouter);

app.listen('3000', function callBack() {
    console.log('Server live on http://localhost:3000');
});