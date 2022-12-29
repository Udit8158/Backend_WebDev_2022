const express = require("express");
const { hash, compare } = require("bcrypt");
const User = require("../models/User");
const { createAccessToken, createRefreshToken } = require("../controllers/JWT");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express();

// REGISTER
router.route("/register").post(async (req, res) => {
  try {
    // check for duplicates
    const duplicate = await User.findOne({ username: req.body.username });
    if (duplicate)
      return res.status(400).json({ message: "User already exists" });

    // If not then create a new user

    const hashPassword = await hash(req.body.password, 10);

    const newUser = User({ ...req.body, password: hashPassword });
    const user = await newUser.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// LOGIN
router.route("/login").post(async (req, res) => {
  try {
    // find user
    const user = await User.findOne({ username: req.body.username });
    // check if user exists
    if (!user) return res.status(404).json({ error: "User not found" });

    // check password
    const passwordMatched = await compare(req.body.password, user.password);
    if (!passwordMatched)
      return res.status(403).json({ error: "Credentials not matched" });

    // When everything is ok
    const accessToken = createAccessToken({
      username: user.username,
      id: user._id,
    });

    const refreshToken = createRefreshToken({
      username: user.username,
      id: user._id,
    });

    // store the refresh token in the db
    await User.findOneAndUpdate(
      { username: req.body.username },
      { refreshToken: refreshToken }
    );

    // send access token as cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 60 * 1000,
      httpOnly: true,
    });
    res.json({
      username: user.username,
      id: user._id,
      accessToken,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// LOGOUT
router.route("/logout").get(verifyToken, async (req, res) => {
  // delete refresh token of user in db
  await User.findOneAndUpdate(
    { username: req.user.username },
    { refreshToken: null }
  );
  // and clear the access token from cookie
  res.status(200).clearCookie("refreshToken").json("success");
});

// REFRESH
router.get("/refresh", verifyToken, async (req, res) => {
  const { username, password } = req.user;

  const newAccessToken = createAccessToken({ username, password });

  res
    .status(200)
    .cookie("access_token", newAccessToken, {
      maxAge: 60 * 1000,
      httpOnly: true,
    })
    .send({ msg: "success" });
});

module.exports = router;
