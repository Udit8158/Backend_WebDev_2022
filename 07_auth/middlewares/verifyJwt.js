const jwt = require("jsonwebtoken");
require("dotenv").config();

// verify jwt signature
const verifyJwt = (req, res, next) => {
  // taking token from authorization header
  const authHeader = req.headers["authorization"]; // Bearer token
  //   console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  //   console.log("token", token);
  if (!token) return res.sendStatus(401).json({ message: "Unauthenticated" });

  // then verify
  jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY, (err, decoded) => {
    if (err) return res.sendStatus(403).json({ message: "Unauthenticated" });

    req.user = decoded.userName;
    next();
  });
};

module.exports = verifyJwt;
