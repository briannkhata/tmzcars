const express = require("express");
const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  const data = {
    title: "Home",
  };
  res.render("home", data);
});

homeRouter.get("/about", (req, res) => {
  const data = {
    title: "About Us",
  };
  res.render("about", data);
});

homeRouter.get("/contact", (req, res) => {
  const data = {
    title: "Contact Us",
  };
  res.render("contact", data);
});
homeRouter.get("/login", (req, res) => {
  const data = {
    title: "Login",
  };
  res.render("login", data);
});
homeRouter.get("/join", (req, res) => {
  const data = {
    title: "Create Account",
  };
  res.render("join", data);
});

module.exports = homeRouter;
