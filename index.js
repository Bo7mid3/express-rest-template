const express = require('express');
const { PORT, ADDR } = require('./constants/env');

const app = express();

require("./filters")(app);

require("./controllers")(app);

app.listen(PORT, console.log(`Server running on: ${ADDR}`))