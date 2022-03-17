const auth = require("./filters/auth");
const { store, initStore } = require("./store");

module.exports = async (server) => {

  await initStore();

  const io = require("socket.io")(server, require("./conf"));

  io.use(auth);

  io.on("connection", async (socket) => {
    const { user } = socket;
    if (user.type == "Repairperson") {
      store.addRepairPerson(user, socket.id);
      socket.on('disconnect', () => {
        store.removeRepairPerson(user);
      });
    }
  });
};
