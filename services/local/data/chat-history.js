const ChatHistory = require("../../../models/chat-history");

const findChatHistory = async (client, repairMan) => {
    var chatHistory = await ChatHistory.findOne({client, repairMan});
    if (!chatHistory) {
        chatHistory = new ChatHistory({
            client,
            repairMan,
            history: []
        });
        chatHistory.save();
    }
    return chatHistory.history;
}

module.exports = { findChatHistory };