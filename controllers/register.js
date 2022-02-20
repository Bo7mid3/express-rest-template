const { User } = require("../models");

module.exports = (app) => {
    app.post("/register", async (req, res) => {
        const user = new User(req.body);
        const result = await user.register();
        if (result.err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
    })
}