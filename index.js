const express = require("express");
const cors = require('cors')

require("dotenv").config();
require("mongoose").connect(process.env.MONGO_URL).catch(err => console.log(err));

const { PORT, ADDR } = require("./constants/env");

const app = express();
const server = require('http').createServer(app);

app.use(cors());


require("./models");

require("./filters")(app);

require("./controllers")(app);

require("./socket")(server);

server.listen(PORT, console.log(`Server running on: ${ADDR}`));
