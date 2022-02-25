module.exports = (app) => {
    app.get("/protected", (req, res) => {
        res.send("here");
    })
}