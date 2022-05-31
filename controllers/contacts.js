const { findChatHistory } = require("../services/local/data/chat-history");
const { getContacts } = require("../services/local/data/contacts");

module.exports = (app) => {
  app.get("/api/contacts", async (req, res) => {
    const { _id } = req.user;
    res.json(await getContacts(_id));
  });

};
