const express = require("express");

const app = express();

const getAll = app.get("/", (req, res) => {
  res.send("All");
});
const getOne = app.get("/getOne/", (req, res) => {
  res.send("get One");
});

const getByCategory = app.get("/getByCategory/", (req, res) => {
  res.send("getBy Category");
});

const remove = app.put("/remove", (req, res) => {
  res.send("remove");
});

const searchCar = app.post("/search/", (req, res) => {
  res.send("search car");
});

const update = app.put("/update", (req, res) => {
  res.send("update");
});

module.exports = {
  getAll,
  getOne,
  remove,
  update,
  searchCar,
  getByCategory,
};
