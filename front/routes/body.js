const express = require("express");
const bodyRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

bodyRouter.get("/", async (req, res) => {
  await axios
    .get(API_URL + "body/")
    .then((response) => {
      res.render("backend/admin/bodies", {
        data: response.data.data,
        title: "Car Bodies",
        name: req.session.user.Name,
        id: req.session.user.UserId,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

bodyRouter.get("/add", async (req, res) => {
  res.render("backend/admin/addbody", {
    id: "",
    body: "",
    title: "Add car body",
    name: req.session.user.Name,
    id: req.session.user.UserId,
  });
});

bodyRouter.get("/edit/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "body/getOne/" + id)
    .then((response) => {
      res.render("backend/admin/addbody", {
        id: id,
        body: response.data.data.Body,
        title: "Update body",
        name: req.session.user.Name,
        id: req.session.user.UserId,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

bodyRouter.post("/save", async (req, res) => {
  const id = req.body.id;
  const SAVE_URL = id ? `${API_URL}body/update/` : `${API_URL}body/add/`;
  await axios
    .post(SAVE_URL, {
      Body: req.body.Body,
      BodyId: id,
    })
    .then((response) => {
      req.flash("success", response.data.message);
      if (id) {
        res.redirect("/body");
      } else {
        res.redirect("/body/add");
      }
    })
    .catch((error) => {
      req.flash("error", error.toString());
      res.redirect("/body/add");
    });
});

bodyRouter.get("/delete/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .put(API_URL + "body/delete/" + id)
    .then((response) => {
      req.flash("success", response.data.message);
      res.redirect("/body/");
    })
    .catch((error) => {
      req.flash("error", "Error deleting body " + error);
      res.redirect("/body/");
    });
});

module.exports = bodyRouter;
