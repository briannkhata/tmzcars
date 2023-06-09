const express = require("express");
const modelRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";
const checkAuth = require("../middleware/CheckAuth.js");
modelRouter.get("/", checkAuth, async (req, res) => {
  await axios
    .get(API_URL + "model/")
    .then((response) => {
      res.render("backend/" + req.session.user.Role.toLowerCase() + "/models", {
        data: response.data.data,
        title: "Models",
        name: req.session.user.Name,
        id: req.session.user.UserId,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

modelRouter.get("/add", checkAuth, async (req, res) => {
  res.render("backend/" + req.session.user.Role.toLowerCase() + "/addmodel", {
    id: "",
    model: "",
    title: "Add Model",
    name: req.session.user.Name,
    id: req.session.user.UserId,
  });
});

modelRouter.get("/edit/(:id)", checkAuth, async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "model/getOne/" + id)
    .then((response) => {
      res.render(
        "backend/" + req.session.user.Role.toLowerCase() + "/addmodel",
        {
          id: id,
          model: response.data.data.Model,
          title: "Update Model",
          name: req.session.user.Name,
          id: req.session.user.UserId,
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

modelRouter.post("/save", checkAuth, async (req, res) => {
  const id = req.body.id;
  const SAVE_URL = id ? `${API_URL}model/update/` : `${API_URL}model/add/`;
  await axios
    .post(SAVE_URL, {
      Model: req.body.Model,
      ModelId: id,
    })
    .then((response) => {
      req.flash("success", response.data.message);
      if (id) {
        res.redirect("/model");
      } else {
        res.redirect("/model/add");
      }
    })
    .catch((error) => {
      req.flash("error", error.toString());
      res.redirect("/model/add");
    });
});

modelRouter.get("/delete/(:id)", checkAuth, async (req, res) => {
  const id = req.params.id;
  await axios
    .put(API_URL + "model/delete/" + id)
    .then((response) => {
      req.flash("success", response.data.message);
      res.redirect("/model/");
    })
    .catch((error) => {
      req.flash("error", "Error deleting model " + error);
      res.redirect("/model/");
    });
});

module.exports = modelRouter;
