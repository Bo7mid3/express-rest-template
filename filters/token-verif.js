const tokenAuth = require("../services/local/token-auth");
const { PROTECTED_ROUTES } = require("../constants/routes");

module.exports = (app) => {
    app.use((req, res, next) => {
        if (PROTECTED_ROUTES.includes(req.path))
            tokenAuth(req, res, next);
        else
            next();
    })
}