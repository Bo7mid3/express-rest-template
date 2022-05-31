const auth = require("./filters/auth");
const { store, initStore } = require("./store");
const initRPListStream = require("./streams/rp-list");
const chatHandler = require("./services/chat");
const webRTCHandler = require("./services/webRTC");

module.exports = async (server) => {

  await initStore();

  const io = require("socket.io")(server, require("./conf"));

  io.use(auth);

  io.on("connection", async (socket) => {
    const { user } = socket;
    console.log("connected")
    store.addUser(socket);
    if (user.type == "Repairperson") {
      store.addRepairPerson(user, socket.id);
      console.log(store);
      socket.on('disconnect', () => {
        console.log("disconnected")
        store.removeRepairPerson(user, socket.id);
      });
      //return;
    }
    initRPListStream(socket);
    chatHandler(io, socket);
    webRTCHandler(io, socket);
  });
};
