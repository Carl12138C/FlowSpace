const express = require("express")
const StreamChat = require('stream-chat').StreamChat;
require("dotenv").config()

const streamAPIRouter = express.Router();
const cilent = StreamChat.getInstance(process.env.streamKey, process.env.streamSecretKey)

streamAPIRouter.get("/users", async function incoming(req, res) {
    var d = new Date()
    d.setMonth(d.getMonth() - 1);
    d.setHours(0, 0, 0, 0);

    const users = await cilent.queryUsers({last_active: {$gt: d} },[{last_active: -1}]);

    res.json(users);
})

module.exports = streamAPIRouter;