const express = require("express");
require("dotenv").config();
const { client } = require("../setUp");

const streamAPIRouter = express.Router();

streamAPIRouter.get("/users", async function incoming(req, res) {
    var d = new Date();
    d.setMonth(d.getMonth() - 1);
    d.setHours(0, 0, 0, 0);

    const users = await client.queryUsers({ last_active: { $gt: d } }, [
        { last_active: -1 },
    ]);

    res.json(users);
});

streamAPIRouter.post(
    "/channel/group/create",
    async function incoming(req, res) {
        try {
            var uidList = req.body.uidList;
            const channel = client.channel("messaging", { members: uidList });
            res.json(channel);
        } catch (e) {
            console.log(e);
        }
    }
);

streamAPIRouter.post("/channel/signup", async function incoming(req, res) {
    try {
        var userEmail = req.body.email;
        var userName = req.body.userName;

        const channel = client.channel(
            "messaging",
            "personal-channel-" + userName,
            { members: [userName] }
        );
        const response = await channel.watch();
        res.send("Channel response:" + response);
    } catch (e) {
        console.log(e);
    }
});

module.exports = streamAPIRouter;
