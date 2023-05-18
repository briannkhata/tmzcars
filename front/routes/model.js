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
        title: "models",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

modelRouter.get("/edit/(:id)", async (req, res) => {
  id = req.params.id;
  await axios
    .get(API_URL + "model/getSingle/" + id)
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/addmodel", {
        id: id,
        model: data.Model,
        title: "Update model",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

modelRouter.get("/add", (req, res) => {
  const data = {
    title: "Add model",
    id: "",
    model: "",
  };
  res.render("backend/admin/addmodel", data);
});

modelRouter.post("/save", async (req, res) => {
  const id = req.body.id;
  await axios
    .post(API_URL + "model/add/", {
      Model: req.body.Model,
      ModelId: id,
    })
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
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
      res.redirect("/models");
    })
    .catch((error) => {
      req.flash("error", "Error deleting model " + error);
      res.redirect("/model/models");
    });
});

module.exports = modelRouter;
