const express = require("express");
const cartypeRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

cartypeRouter.get("/", async (req, res) => {
  await axios
    .get(API_URL + "cartype/")
    .then((response) => {
      res.render("backend/admin/cartypes", {
        data: response.data.data,
        title: "Car Types",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

cartypeRouter.get("/add", async (req, res) => {
  res.render("backend/admin/addcartype", {
    id: "",
    cartype: "",
    title: "Add car type",
  });
});

cartypeRouter.get("/edit/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "cartype/getOne/" + id)
    .then((response) => {
      res.render("backend/admin/addcartype", {
        id: id,
        cartype: response.data.data.cartype,
        title: "Update cartype",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

cartypeRouter.post("/save", async (req, res) => {
  const id = req.body.id;
  const SAVE_URL = id ? `${API_URL}cartype/update/` : `${API_URL}cartype/add/`;
  await axios
    .post(SAVE_URL, {
      CarType: req.body.CarType,
      CarTypeId: id,
    })
    .then((response) => {
      req.flash("success", response.data.message);
      if (id) {
        res.redirect("/cartype");
      } else {
        res.redirect("/cartype/add");
      }
    })
    .catch((error) => {
      req.flash("error", error.toString());
      res.redirect("/cartype/add");
    });
});

cartypeRouter.get("/delete/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .put(API_URL + "cartype/delete/" + id)
    .then((response) => {
      req.flash("success", response.data.message);
      res.redirect("/cartype/");
    })
    .catch((error) => {
      req.flash("error", "Error deleting cartype " + error);
      res.redirect("/cartype/");
    });
});

module.exports = cartypeRouter;
