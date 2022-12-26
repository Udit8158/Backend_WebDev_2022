const express = require("express");
const { registerNewUser } = require("../controllers/registerController");
const registerRouter = express();

registerRouter.route("/").post(registerNewUser);

module.exports = registerRouter;
