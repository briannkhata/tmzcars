const express = require("express");
const homeController = require("../controllers/HomeController.js");
const router = express.Router();
router.get("/", homeController.home);
router.get("/about", homeController.about);
router.get("/contact", homeController.contact);
router.get("/join", homeController.join);
router.get("/login", homeController.login);

module.exports = router;
