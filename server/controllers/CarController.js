const express = require("express");

const app = express();

const getAll = app.get("/", (req, res) => {
  res.send("All");
});
const getOne = app.get("/getOne/", (req, res) => {
  res.send("get One");
});

const remove = app.put("/remove", (req, res) => {
  res.send("remove");
});

const update = app.put("/update", (req, res) => {
  res.send("update");
});

module.exports = {
  getAll,
  getOne,
  remove,
  update,
};
