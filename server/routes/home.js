const express = require("express");
const homeController = require("../controllers/HomeController.js");
const homeRouter = express.Router();

homeRouter.post("/register", homeController.register);
homeRouter.post("/login", homeController.login);

module.exports = homeRouter;
