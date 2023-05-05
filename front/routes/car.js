const express = require("express");
const carRouter = express.Router();
const axios = require("axios");

carRouter.get("/cars", (req, res) => {
  const data = {
    title: "Car List",
  };
  res.render("backend/admin/cars", data);
});

module.exports = carRouter;
