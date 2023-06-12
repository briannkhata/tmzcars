const express = require("express");
const fueltypeRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";
const checkAuth = require("../middleware/CheckAuth.js");

fueltypeRouter.get("/", checkAuth, async (req, res) => {
  await axios
    .get(API_URL + "fueltype/")
    .then((response) => {
      res.render(
        "backend/" + req.session.user.Role.toLowerCase() + "/fueltypes",
        {
          data: response.data.data,
          title: "fueltypes",
          name: req.session.user.Name,
          userId: req.session.user.UserId,
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

fueltypeRouter.get("/add", checkAuth, async (req, res) => {
  res.render(
    "backend/" + req.session.user.Role.toLowerCase() + "/addfueltype",
    {
      id: "",
      fueltype: "",
      title: "Add fueltype",
      name: req.session.user.Name,
      userId: req.session.user.UserId,
    }
  );
});

fueltypeRouter.get("/edit/(:id)", checkAuth, async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "fueltype/getOne/" + id)
    .then((response) => {
      res.render(
        "backend/" + req.session.user.Role.toLowerCase() + "/addfueltype",
        {
          id: id,
          fueltype: response.data.data.FuelType,
          title: "Update fueltype",
          name: req.session.user.Name,
          userId: req.session.user.UserId,
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

fueltypeRouter.post("/save", checkAuth, async (req, res) => {
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

fueltypeRouter.get("/delete/(:id)", checkAuth, async (req, res) => {
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
