const express = require("express");
const modelRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

modelRouter.get("/", async (req, res) => {
  await axios
    .get(API_URL + "model/")
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/models", {
        data: data,
        title: "Models",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

modelRouter.get("/add/(:id)", async (req, res) => {
  const id = req.params.id;
  if (id !== "") {
    await axios
      .get(API_URL + "model/getSingle/" + id)
      .then((response) => {
        res.render("backend/admin/addmodel", {
          id: id,
          model: response.data.data.Model,
          title: "Update Model",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res.render("backend/admin/addmodel", {
      id: "",
      model: "",
      title: "Add Model",
    });
  }
});

modelRouter.post("/save", async (req, res) => {
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

modelRouter.get("/delete/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .put(API_URL + "model/delete/" + id)
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      res.redirect("/model/");
    })
    .catch((error) => {
      req.flash("error", "Error deleting model " + error);
      res.redirect("/model/");
    });
});

module.exports = modelRouter;
