const { User } = require("../models");

module.exports = (app) => {
    app.post("/api/register", async (req, res) => {
        try {
            const user = new User(req.body);
            const result = await user.register();
            const token = result.generateToken();
            return res.status(200).json({token});
        }
        catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    })
}