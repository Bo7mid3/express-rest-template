module.exports = (app) => {
    app.get("/api/check-auth", (req, res) => {
        res.sendStatus(200);
    })
}