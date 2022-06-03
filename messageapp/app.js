require("dotenv/config");

require("./db")

const express = require("express");

const app = express();

require("./config")(app);

const messageappRoutes = require("./routes/messageapp.routes");
app.use("/", messageappRoutes);

require("./error-handling")(app);

module.exports = app;