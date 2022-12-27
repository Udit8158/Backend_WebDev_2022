const users = require("../data/users.json");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // to access the dotenv file
const fsPromise = require("fs/promises");
const path = require("path");

const logInUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // check req have a username and password
    if (!userName || !password)
      return res
        .status(400)
        .json({ message: "Username and password required" });

    // check if user exists
    const foundUser = users.find((user) => user.userName === userName);
    if (!foundUser) return res.status(401).json({ message: "User not found" });

    // check if password is correct
    const matchPassword = await bcrypt.compare(password, foundUser.password);

    if (!matchPassword) {
      return res.status(401).json({ message: "Password does not match" });
    } else {
      // TODO: JWTs token creation
      const accessToken = jwt.sign(
        { userName: foundUser.userName },
        process.env.ACCESS_TOKEN_PRIVATE_KEY,
        { expiresIn: "15s" }
      );

      const refreshToken = jwt.sign(
        { userName: foundUser.userName },
        process.env.REFRESH_TOKEN_PRIVATE_KEY,
        { expiresIn: "1d" }
      );

      // add the refresh token to the current loggedin user
      const otherUsers = users.filter(
        (user) => user.userName !== foundUser.userName
      );
      const currentUser = { ...foundUser, refreshToken };
      const usersList = [...otherUsers, currentUser];

      // update the data file
      await fsPromise.writeFile(
        path.join(__dirname, "..", "data", "users.json"),
        JSON.stringify(usersList)
      );

      // send refresh token in httponly cookie
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      // send access token to json
      return res.status(200).json({
        message: `Welcome ${foundUser.userName} logged in successfully`,
        accessToken,
      });
    }
  } catch (err) {
    res.sendStatus(404).json({ err });
  }
};

module.exports = logInUser;
