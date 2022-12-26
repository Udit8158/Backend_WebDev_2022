const express = require("express");
const logInUser = require("../controllers/logInController");

const logInRoute = express();

logInRoute.route("/").post(logInUser);

module.exports = logInRoute;
