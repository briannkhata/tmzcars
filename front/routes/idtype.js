const express = require("express");
const idtypeRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";
const checkAuth = require("../middleware/CheckAuth.js");

idtypeRouter.get("/", checkAuth, async (req, res) => {
  await axios
    .get(API_URL + "idtype/")
    .then((response) => {
      res.render(
        "backend/" + req.session.user.Role.toLowerCase() + "/idtypes",
        {
          data: response.data.data,
          title: "idtypes",
          name: req.session.user.Name,
          userId: req.session.user.UserId,
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

idtypeRouter.get("/add", checkAuth, async (req, res) => {
  res.render("backend/" + req.session.user.Role.toLowerCase() + "/addidtype", {
    id: "",
    idtype: "",
    title: "Add idtype",
    name: req.session.user.Name,
    userId: req.session.user.UserId,
  });
});

idtypeRouter.get("/edit/(:id)", checkAuth, async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "idtype/getOne/" + id)
    .then((response) => {
      res.render(
        "backend/" + req.session.user.Role.toLowerCase() + "/addidtype",
        {
          id: id,
          idtype: response.data.data.IdType,
          title: "Update idtype",
          name: req.session.user.Name,
          userId: req.session.user.UserId,
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

idtypeRouter.post("/save", checkAuth, async (req, res) => {
  const id = req.body.id;
  const SAVE_URL = id ? `${API_URL}idtype/update/` : `${API_URL}idtype/add/`;
  await axios
    .post(SAVE_URL, {
      IdType: req.body.IdType,
      IdTypeId: id,
    })
    .then((response) => {
      req.flash("success", response.data.message);
      if (id) {
        res.redirect("/idtype");
      } else {
        res.redirect("/idtype/add");
      }
    })
    .catch((error) => {
      req.flash("error", error.toString());
      res.redirect("/idtype/add");
    });
});

idtypeRouter.get("/delete/(:id)", checkAuth, async (req, res) => {
  await axios
    .put(API_URL + "idtype/delete/" + req.params.id)
    .then((response) => {
      req.flash("success", response.data.message);
      res.redirect("/idtype/");
    })
    .catch((error) => {
      req.flash("error", "Error deleting idtype " + error);
      res.redirect("/idtype/");
    });
});

module.exports = idtypeRouter;
