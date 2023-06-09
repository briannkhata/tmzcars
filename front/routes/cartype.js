const express = require("express");
const cartypeRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";
const checkAuth = require("../middleware/CheckAuth.js");

cartypeRouter.get("/", checkAuth, async (req, res) => {
  await axios
    .get(API_URL + "cartype/")
    .then((response) => {
      res.render(
        "backend/" + req.session.user.Role.toLowerCase() + "/cartypes",
        {
          data: response.data.data,
          title: "Car Types",
          name: req.session.user.Name,
          userId: req.session.user.UserId,
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

cartypeRouter.get("/add", checkAuth, async (req, res) => {
  res.render("backend/" + req.session.user.Role.toLowerCase() + "/addcartype", {
    id: "",
    cartype: "",
    title: "Add car type",
    name: req.session.user.Name,
    userId: req.session.user.UserId,
  });
});

cartypeRouter.get("/edit/(:id)", checkAuth, async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "cartype/getOne/" + id)
    .then((response) => {
      res.render(
        "backend/" + req.session.user.Role.toLowerCase() + "/addcartype",
        {
          id: id,
          cartype: response.data.data.CarType,
          title: "Update cartype",
          name: req.session.user.Name,
          userId: req.session.user.UserId,
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

cartypeRouter.post("/save", checkAuth, async (req, res) => {
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

cartypeRouter.get("/delete/(:id)", checkAuth, async (req, res) => {
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
