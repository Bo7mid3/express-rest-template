const { User } = require("../models");

module.exports = (app) => {
    app.post("/register", (req, res) => {
        const { email, password } = req.body;
        let uniq = await User.findOne({ email: email });
        if (uniq) {
            if (uniq.err) {
                res.sendStatus(500);
                return;
            }
            res.sendStatus(400);
            return;
        }

        res.sendStatus(200);
    })
}