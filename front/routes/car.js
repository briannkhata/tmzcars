const express = require("express");
const carRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

carRouter.get("/", async (req, res) => {
  await axios
    .get(API_URL + "car/")
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/cars", {
        data: data,
        title: "cars",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

carRouter.get("/edit/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "car/getOne/" + id)
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/addcar", {
        id: id,
        car: data.car,
        title: "Update car",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

carRouter.get("/add", (req, res) => {
  const data = {
    title: "Add car",
    id: "",
    car: "",
  };
  res.render("backend/admin/addcar", data);
});

carRouter.post("/save", async (req, res) => {
  const id = req.body.id;
  await axios
    .post(API_URL + "car/add/", {
      car: req.body.car,
      carId: id,
    })
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      if (id) {
        res.redirect("/car/");
      } else {
        res.redirect("/car/add");
      }
    })
    .catch((error) => {
      req.flash("error", "Error saving car" + error);
      res.redirect("/car/add");
    });
});

carRouter.get("/delete/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .put(API_URL + "car/delete/" + id)
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      res.redirect("/car");
    })
    .catch((error) => {
      req.flash("error", "Error deleting car " + error);
      res.redirect("/car");
    });
});

module.exports = carRouter;
