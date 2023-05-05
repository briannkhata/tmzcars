const express = require("express");
const homeController = require("../controllers/HomeController.js");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User.js");

//const checkAuth = require("../middleware/checkAuth.js");

const homeRouter = express.Router();

//homeRouter.use(checkAuth);
homeRouter.post("/register", homeController.register);
homeRouter.post("/login", homeController.login);

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1].trim();
    console.log(token);

    const decode = jwt.verify(token, "2050");
    const user = User.findByPk(decode.UserId);
    console.log(decode);
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    console.log(jwt.decode);
    next();

    //     try {
    //       const decoded = jwt.verify(
    //         token,
    //         "ed7024cc274437c28cd757e7cf9e8a54eb0db1e"
    //       );
    //       //const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    //       //req.user = decoded;
    //       next();
    //     } catch (err) {
    //       res.status(401).send("Invalid token " + err);
    //     }
    //   } else {
    //     res.status(401).send("No token provided");
    //   }
  }
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjExMTEiLCJpYXQiOjE2ODMyNzE3OTd9.GP6vO_YZg9WEOaom7299l8383LxNgu0J1sFtH2fxzHs

module.exports = homeRouter;
