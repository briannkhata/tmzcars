const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/User.js");

// This middleware function checks if a valid authorization header is present in the request
const checkAuth = async (req, res, next) => {
  // if (
  //   req.headers &&
  // req.headers.Authorization &&
  //req.headers.authorization.split(" ")[0] === "Bearer" &&
  //   req.headers.Authorization.split(" ")[1]
  //) {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  console.log(process.env.ACCESS_TOKEN_SECRET);
  //try {
  const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findOne({ where: { UserId: decode.UserId } });
  console.log(decode);
  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
  console.log(jwt.decode);
  // } catch (error) {
  // res.status(401).json({ error: "Unauthorized  " + error });
  //}
  //}
};

module.exports = checkAuth;
