const express = require("express");
const fueltypeRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

fueltypeRouter.get("/", async (req, res) => {
  await axios
    .get(API_URL + "fueltype/")
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/fueltypes", {
        data: data,
        title: "Fueltypes",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

fueltypeRouter.get("/edit/(:id)", async (req, res) => {
  id = req.params.id;
  await axios
    .get(API_URL + "fueltype/getOne/" + id)
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/addfueltype", {
        id: id,
        fueltype: data.fueltype,
        title: "Update fueltype",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

fueltypeRouter.get("/add", (req, res) => {
  const data = {
    title: "Add fueltype",
    id: "",
    fueltype: "",
  };
  res.render("backend/admin/addfueltype", data);
});

fueltypeRouter.post("/save", async (req, res) => {
  const id = req.body.id;
  await axios
    .post(API_URL + "fueltype/save/", {
      fueltype: req.body.fueltype,
      fueltypeId: id,
    })
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      if (id) {
        res.redirect("/fueltype/");
      } else {
        res.redirect("/fueltype/addfueltype");
      }
    })
    .catch((error) => {
      req.flash("error", "Error saving fueltype" + error);
      res.redirect("/fueltype/add");
    });
});

fueltypeRouter.get("/delete/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .put(API_URL + "fueltype/delete/" + id)
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      res.redirect("/fueltype");
    })
    .catch((error) => {
      req.flash("error", "Error deleting fueltype " + error);
      res.redirect("/fueltype");
    });
});

module.exports = fueltypeRouter;
