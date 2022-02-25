module.exports = (app) => {
    require("./body-parser")(app);
    require("./token-verif")(app);
}