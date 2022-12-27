const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {
  handleRefreshToken,
  handleLogin,
} = require("./controllers/authController");
const verifyToken = require("./middlewares/verifyToken");

const { router: userRoute } = require("./routes/usersRoute");

const app = express();
const port = process.env.PORT || 3000;

// controller function

// Middleware
app.use(express.json());

//Routes
app.post("/api/login", handleLogin);

app.post("/api/refresh", handleRefreshToken);

app.use("/api/users", verifyToken, userRoute);

app.listen(port, () => console.log("listening on port " + port));
