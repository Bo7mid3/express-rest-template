const { User } = require("../models");

module.exports = (app) => {
    app.post("/register", async (req, res) => {
        try {
            const user = new User(req.body);
            const result = await user.register();
            return res.sendStatus(200);
        }
        catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    })
}