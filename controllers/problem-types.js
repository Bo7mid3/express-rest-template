const { findAll } = require("../services/local/data/problem-type");

module.exports = (app) => {
    app.get("/api/problem-types", async (req, res) => {
        res.json(await findAll());
    })
}