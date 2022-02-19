const { User } = require("../models");

module.exports = (app) => {
    app.post("/register", (req, res) => {
        /* let uniq = User.findOne({ email: email });
        if (uniq) {
            if (uniq.err) {
                res.sendStatus(500);
                return;
            }
            res.sendStatus(400);
            return;
        } */
        const user = new User(req.body);
        const res = await user.register();
        if (res.err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
    })
}