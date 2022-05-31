const { store } = require("../store")

const initRPListStream = (socket) => {
  socket.on("subscribeToRpList", (problemTypeId) => {
    //console.log(store.getRepairPersonsByProblemType(problemTypeId));
    socket.emit("rPList", store.getRepairPersonsByProblemType(problemTypeId));
  });
  socket.on("unsubscribeToRpList", () => {
    //socket.removeAllListeners('subscribeToRpList');
  })
};

module.exports = initRPListStream;

