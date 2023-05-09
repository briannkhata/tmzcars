const express = require("express");
const carRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

carRouter.get("/cars", (req, res) => {
  const data = {
    title: "Car List",
  };
  res.render("backend/admin/cars", data);
});

carRouter.get("/makes", async (req, res) => {
  await axios
    .get(API_URL + "make/")
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/makes", {
        data: data,
        title: "Makes",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

carRouter.get("/models", (req, res) => {
  const data = {
    title: "Models",
  };
  res.render("backend/admin/models", data);
});

carRouter.get("/addmodel", (req, res) => {
  const data = {
    title: "Add Model",
  };
  res.render("backend/admin/addmodel", data);
});

carRouter.get("/addmake", (req, res) => {
  const data = {
    title: "Add Make",
  };
  res.render("backend/admin/addmake", data);
});

carRouter.post("/addmake", async (req, res) => {
  await axios
    .post(API_URL + "make/add/", {
      Make: req.body.Make,
    })
    .then((response) => {
      req.flash("success", "Saving Make successfull");
      res.redirect("/car/addmake");
    })
    .catch((error) => {
      req.flash("error", "Error saving Make" + error);
      res.redirect("/car/addmake");
    });
});

carRouter.post("/addmodel", async (req, res) => {
  await axios
    .post(API_URL + "model/add/", {
      Make: req.body.Make,
    })
    .then((response) => {
      req.flash("success", "Saving Model successfull");
      res.redirect("/car/addmodel");
    })
    .catch((error) => {
      req.flash("error", "Error saving Model" + error);
      res.redirect("/car/addmodel");
    });
});

module.exports = carRouter;
