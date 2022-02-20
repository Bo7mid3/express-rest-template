const localAuth = require("../services/local/auth");

module.exports = (app) => {
    app.post("/login", localAuth, (req, res) => {
        res.sendStatus(200);
    })
}