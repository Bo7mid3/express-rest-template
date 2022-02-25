const localAuth = require("../services/local/form-auth");

module.exports = (app) => {
    app.post("/login", localAuth, (req, res) => {
        const token = req.user.generateToken();
        res.status(200).json({ token });
    })
}