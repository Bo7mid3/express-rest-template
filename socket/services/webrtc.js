const { store } = require("../store")

const webRTCHandler = (io, socket) => {
    socket.on("call", ({offer, destUserId}) => {
        //console.log("send")
        const dests = store.getReceiverSocketsIds({_id: destUserId});
        for (let endSocket of dests)
            io.to(endSocket.id).emit("call", { offer, callerId: socket.user._id });
    })
    socket.on("answer", ({answer,  destUserId})=> {
        const dests = store.getReceiverSocketsIds({_id: destUserId});
        for (let endSocket of dests)
            io.to(endSocket.id).emit("answer", answer);
    })

    socket.on("candidate", (candidate) => {
        socket.broadcast.emit("candidate", candidate);
    })
};

module.exports = webRTCHandler;