const ChatHistory = require("../../../models/chat-history");

const getContacts = async (userId) => {
    const chats =  await ChatHistory.aggregate([{$lookup: { from: "users", localField: "client", foreignField: "_id", as: "user"}}, {$match: {repairMan: userId}}]);
    const contacts = [];
    for(let chat of chats) {
        delete chat.user[0].password;
        contacts.push({ user: chat.user[0] ,lastMsg: chat.history[chat.history.length-1] });
    }
    return contacts;
}

module.exports = { getContacts };