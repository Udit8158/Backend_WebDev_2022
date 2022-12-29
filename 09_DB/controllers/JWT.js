const { sign } = require("jsonwebtoken");

const createAccessToken = (user) => {
  return sign(user, process.env.ACCESS_TOKEN_KEY, { expiresIn: "40s" });
};

const createRefreshToken = (user) => {
  return sign(user, process.env.REFRESH_TOKEN_KEY, { expiresIn: "1d" });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
};
