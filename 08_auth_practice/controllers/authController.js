const jwt = require("jsonwebtoken");
const { users } = require("../routes/usersRoute");

let refreshTokens = [];

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

const handleLogin = (req, res, next) => {
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
  next();
};

const handleRefreshToken = (req, res, next) => {
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

    next();
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  handleLogin,
  handleRefreshToken,
};
