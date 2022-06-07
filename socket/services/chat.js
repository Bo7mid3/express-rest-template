const { store } = require("../store")
const ChatHistory = require("../../models/chat-history");

const chatHandler = (io, socket) => {
    socket.on("msgSend", ({ content, receiver }) => {
        console.log("send")
        const dests = store.getReceiverSocketsIds({ _id: receiver });
        for (let endSocket of dests)
            io.to(endSocket.id).emit("receivedMsg", { content, sender: socket.user._id });

        const { type } = socket.user;
        const persist = async () => {
            var chatHistory;
            if (type == "Client")
                chatHistory = await ChatHistory.find({ client: socket.user._id, repairMan: receiver });
            else {
                chatHistory = await ChatHistory.find({ repairMan: socket.user._id, client: receiver });
            }
            console.log(chatHistory[0].history+"hereeee");
            chatHistory[0].history.push({ content, sender: socket.user._id });
            chatHistory[0].save();
        }
        persist();
        console.log("sockets", dests);
    })
};

module.exports = chatHandler;

