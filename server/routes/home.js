const express = require("express");
const homeController = require("../controllers/HomeController.js");
const homeRouter = express.Router();
homeRouter.get("/", homeController.home);
homeRouter.get("/about", homeController.about);
homeRouter.get("/contact", homeController.contact);
homeRouter.get("/join", homeController.join);
homeRouter.get("/login", homeController.login);
homeRouter.post("/login", homeController.signin);
homeRouter.post("/join", homeController.register);

module.exports = homeRouter;
