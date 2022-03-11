const express = require("express");
require("dotenv").config();
require("mongoose").connect(process.env.MONGO_URL).catch(err => console.log(err));

const { PORT, ADDR } = require("./constants/env");

const app = express();
const server = require('http').createServer(app);

require("./socket")(server);

require("./models");

require("./filters")(app);

require("./controllers")(app);

server.listen(PORT, console.log(`Server running on: ${ADDR}`));
