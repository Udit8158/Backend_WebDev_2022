const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const router = express();

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

router.get("/", verifyToken, (req, res) => {
  const filteredUsers = users.filter((usr) => usr.username === req.user);
  res.json(filteredUsers);
});

module.exports = { router, users };
