const express = require("express");
const fueltypeRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

fueltypeRouter.get("/", async (req, res) => {
  await axios
    .get(API_URL + "fueltype/")
    .then((response) => {
      res.render("backend/admin/fueltypes", {
        data: response.data.data,
        title: "fueltypes",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

fueltypeRouter.get("/add", async (req, res) => {
  res.render("backend/admin/addfueltype", {
    id: "",
    fueltype: "",
    title: "Add fueltype",
  });
});

fueltypeRouter.get("/edit/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "fueltype/getOne/" + id)
    .then((response) => {
      res.render("backend/admin/addfueltype", {
        id: id,
        fueltype: response.data.data.FuelType,
        title: "Update fueltype",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

fueltypeRouter.post("/save", async (req, res) => {
  const id = req.body.id;
  const SAVE_URL = id
    ? `${API_URL}fueltype/update/`
    : `${API_URL}fueltype/add/`;
  await axios
    .post(SAVE_URL, {
      FuelType: req.body.FuelType,
      FuelTypeId: id,
    })
    .then((response) => {
      req.flash("success", response.data.message);
      if (id) {
        res.redirect("/fueltype");
      } else {
        res.redirect("/fueltype/add");
      }
    })
    .catch((error) => {
      req.flash("error", error.toString());
      res.redirect("/fueltype/add");
    });
});

fueltypeRouter.get("/delete/(:id)", async (req, res) => {
  await axios
    .put(API_URL + "fueltype/delete/" + req.params.id)
    .then((response) => {
      req.flash("success", response.data.message);
      res.redirect("/fueltype/");
    })
    .catch((error) => {
      req.flash("error", "Error deleting fueltype " + error);
      res.redirect("/fueltype/");
    });
});

module.exports = fueltypeRouter;
