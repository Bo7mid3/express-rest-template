const tokenAuth = require("../services/local/auth/token-auth");
const { PROTECTED_ROUTES } = require("../constants/routes");

module.exports = (app) => {
  app.use((req, res, next) => {
    if (
      PROTECTED_ROUTES.some((regex) => {
        return regex.test(req.path);
      })
    ) {
      tokenAuth(req, res, next);
    } else {
      next();
    }
  });
};
