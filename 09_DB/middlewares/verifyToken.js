const { verify } = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const accessToken = authHeader?.split(" ")[1];

  if (!accessToken) return res.status(403).json({ error: "Unauthorized" });

  verify(accessToken, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Forbidden" });

    req.user = decoded;
    res.status(200);
    next();
  });
};

module.exports = {
  verifyToken,
};
