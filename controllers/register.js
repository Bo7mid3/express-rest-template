module.exports = (app) => {
    app.post("/register", (req, res) => {
        console.log(req.body);
        res.sendStatus(200);
    })
}