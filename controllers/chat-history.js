const { findChatHistory } = require("../services/local/data/chat-history");

module.exports = (app) => {
  app.get("/api/chat-history/:pair_id", async (req, res) => {
    const { _id, type } = req.user;
    const { pair_id } = req.params;
    if (type == "client") { 
      res.json(await findChatHistory(_id, pair_id));
      return;
    }
    res.json(await findChatHistory(pair_id, _id));
  });

};
