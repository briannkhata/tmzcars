const express = require("express");
const carRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

carRouter.get("/", async (req, res) => {
  await axios
    .get(API_URL + "body/")
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/bodies", {
        data: data,
        title: "Car Bodies",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

carRouter.get("/edit/(:id)", async (req, res) => {
  id = req.params.id;
  await axios
    .get(API_URL + "body/getOne/" + id)
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/addbody", {
        id: id,
        Body: data.Body,
        title: "Update Body",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

carRouter.get("/addbody", (req, res) => {
  const data = {
    title: "Add Body",
    id: "",
    body: "",
  };
  res.render("backend/admin/addbody", data);
});

carRouter.post("/save", async (req, res) => {
  const id = req.body.id;
  await axios
    .post(API_URL + "body/save/", {
      Body: req.body.Body,
      BodyId: id,
    })
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      if (id) {
        res.redirect("/body/");
      } else {
        res.redirect("/body/addbody");
      }
    })
    .catch((error) => {
      req.flash("error", "Error saving body" + error);
      res.redirect("/body/addbody");
    });
});

carRouter.get("/delete/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .put(API_URL + "body/delete/" + id)
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      res.redirect("/body");
    })
    .catch((error) => {
      req.flash("error", "Error deleting body " + error);
      res.redirect("/body");
    });
});

module.exports = carRouter;
