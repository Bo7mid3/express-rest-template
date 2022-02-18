const ip = require("ip");

const HOST_NAME = ip.address();
const PORT = process.env.PORT || 4111;
const ADDR = `${HOST_NAME}:${PORT}`

module.exports.HOST_NAME = HOST_NAME;
module.exports.PORT = PORT;
module.exports.ADDR = ADDR;