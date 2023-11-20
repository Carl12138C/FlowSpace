const express = require("express")
require("dotenv").config()

const streamAPIRouter = express.Router();

streamAPIRouter.use("/user/:id", function incoming(req, res) {
    res.send("User Id: " + req.params.id);
})

module.exports = streamAPIRouter;