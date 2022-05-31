const ChatHistory = require("../../../models/chat-history");

const getContacts = async (userId) => {
    const chats =  await ChatHistory.aggregate([{$lookup: { from: "users", localField: "client", foreignField: "_id", as: "client"}}, {$match: {repairMan: userId}}]);
    const contacts = [];
    for(let chat of chats) {
        delete chat.client[0].password;
        contacts.push({ client: chat.client[0] ,lastMsg: chat.history[chat.history.length-1] });
    }
    return contacts;
}

module.exports = { getContacts };