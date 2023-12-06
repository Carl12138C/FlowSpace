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

    const user = users.users;

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

streamAPIRouter.post("/channel/leave", async function incoming(req, res) {
    res.status(200).send("You reached here");
});

module.exports = streamAPIRouter;
