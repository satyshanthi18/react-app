const express = require("express");
const app = express();
const config = require("./configs/config.json");
const passport = require("passport");
const { jwtStrategy } = require("./configs/passport");
const routes = require("./app/routes");
const mongoose = require("mongoose");
let port = process.env.NODE_ENV === 'test' ? 3335 : 3334;
const env = config.env
const route = config.server.app.route;
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require('compression');

app.use(compression()); 
app.use(cors("*"));

mongoose.connect(config.database.mongodb.uri);
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});

app.get("/" + route, (req, res) => {
  res.send(`<h1>Process Traceability App Running</h1>`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/v1", routes);
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

module.exports = app;
