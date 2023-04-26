const express = require("express");

const app = express();

const home = app.get("/", (req, res) => {
  res.send("Home");
});
const about = app.get("/about", (req, res) => {
  res.send("About");
});
const contact = app.get("/contact", (req, res) => {
  res.send("Contact");
});
const join = app.get("/join", (req, res) => {
  res.send("Join");
});
const login = app.get("/login", (req, res) => {
  res.send("Login");
});

module.exports = {
  home,
  about,
  contact,
  join,
  login,
};
