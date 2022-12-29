require("dotenv").config();
const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {
  handleRefreshToken,
  handleLogin,
  handleLogout,
} = require("./controllers/authController");
const verifyToken = require("./middlewares/verifyToken");

const { router: userRoute } = require("./routes/usersRoute");

const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

// controller function

// Middleware
app.use(express.json());

//Routes
app.post("/api/login", handleLogin);

app.post("/api/refresh", handleRefreshToken);

app.use("/api/users", verifyToken, userRoute);

app.post("/api/logOut", verifyToken, handleLogout);

app.listen(port, () => console.log("listening on port " + port));
