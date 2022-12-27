const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3000;

const users = [
  {
    id: "1",
    username: "John Doe",
    password: "123456",
  },

  {
    id: "2",
    username: "Jane Doe",
    password: "123456",
  },
];

let refreshTokens = [];

// controller function
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json("Unauthorized");

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json("Forbidden");
    req.user = decoded.username;
    next();
  });
};

const generateAccessToken = (id, username) => {
  return jwt.sign({ id, username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
};
const generateRefreshToken = (id, username) => {
  return jwt.sign({ id, username }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

// Middleware
app.use(express.json());

//Routes
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // check if the user details are there
  if (!username || !password)
    return res.status(401).json("Username and Password Required");

  // found the username
  const foundUser = users.find((user) => user.username === username);

  if (!foundUser) return res.status(401).json("User Not Found");

  // check for password
  const correctPassword = foundUser.password;
  if (password !== correctPassword)
    return res.status(401).json("Wrong Password");

  // create token
  const accessToken = generateAccessToken(foundUser.id, username);
  const refreshToken = generateRefreshToken(foundUser.id, username);

  refreshTokens.push(refreshToken);

  res.json({ username, accessToken, refreshToken });
});

app.post("/api/refresh", (req, res) => {
  const { refreshToken } = req.body;

  // check validity of refresh token
  if (!refreshToken) return res.status(401).json("Refres Token is required");
  if (!refreshTokens.includes(refreshToken))
    return res.status(401).json("Invalid Refresh Token");

  // verify
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).json("Invalid Refresh Token");

    // delete the current refresh token
    refreshTokens.filter((token) => token !== refreshToken);

    const username = decoded.username;
    const userId = decoded.id;

    // console.log(username, userId);

    // generate new tokens
    const newAccessToken = generateAccessToken(userId, username);
    const newRefreshToken = generateRefreshToken(userId, username);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({ newAccessToken, newRefreshToken });
  });
});

app.get("/api/users", verifyToken, (req, res) => {
  const filteredUsers = users.filter((usr) => usr.username === req.user);
  res.json(filteredUsers);
});

app.listen(port, () => console.log("listening on port " + port));
