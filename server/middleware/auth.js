const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.header("x-access-token");
  //const token = req.header("x-auth-token");
  //const token = req.headers.authorization;

  if (!token)
    return res.status(401).json({
      success: 0,
      message: "Unauthorized request",
    });

  try {
    // const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // req.user = decoded;

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err)
        return res
          .status(500)
          .json({ auth: false, message: "Failed to authenticate token." });
      res.status(200).json(decoded);
    });
  } catch (error) {
    return res.status(401).json({
      success: 0,
      message: "Token Expired",
    });
  }

  next();
};
