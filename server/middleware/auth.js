const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send({
      success: 0,
      error: "Access denied. No token provided",
    });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    req.user = decoded;
  } catch (error) {
    return res.status(401).send({
      success: 0,
      message: "Token expired",
    });
  }

  next();
};
