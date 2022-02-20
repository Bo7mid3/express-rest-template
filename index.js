const express = require("express");
require("dotenv").config();
require("mongoose").connect(process.env.MONGO_URL);

const { PORT, ADDR } = require("./constants/env");

const app = express();

require("./models");

require("./filters")(app);

require("./controllers")(app);

app.listen(PORT, console.log(`Server running on: ${ADDR}`));
