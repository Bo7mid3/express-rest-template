const { store } = require("../store")

const chatHandler = (io, socket) => {
    socket.on("msgSend", ({content, receiver}) => {
        console.log("send")
        const dests = store.getReceiverSocketsIds({_id:receiver});
        console.log("sockets",dests);
        for (let endSocket of dests)
            io.to(endSocket.id).emit("receivedMsg",{content, sender: socket.user._id});
    })
};

module.exports = chatHandler;

