const express = require("express");
const makeRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";
const checkAuth = require("../middleware/CheckAuth.js");

makeRouter.get("/", checkAuth, async (req, res) => {
  await axios
    .get(API_URL + "make/")
    .then((response) => {
      res.render("backend/" + req.session.user.Role.toLowerCase() + "/makes", {
        data: response.data.data,
        title: "Makes",
        name: req.session.user.Name,
        userId: req.session.user.UserId,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

makeRouter.get("/add", checkAuth, async (req, res) => {
  res.render("backend/" + req.session.user.Role.toLowerCase() + "/addmake", {
    id: "",
    make: "",
    title: "Add make",
    name: req.session.user.Name,
    id: req.session.user.UserId,
  });
});

makeRouter.get("/edit/(:id)", checkAuth, async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "make/getOne/" + id)
    .then((response) => {
      res.render(
        "backend/" + req.session.user.Role.toLowerCase() + "/addmake",
        {
          id: id,
          make: response.data.data.make,
          title: "Update make",
          name: req.session.user.Name,
          id: req.session.user.UserId,
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

makeRouter.post("/save", checkAuth, async (req, res) => {
  const id = req.body.id;
  const SAVE_URL = id ? `${API_URL}make/update/` : `${API_URL}make/add/`;
  await axios
    .post(SAVE_URL, {
      Make: req.body.Make,
      MakeId: id,
    })
    .then((response) => {
      req.flash("success", response.data.message);
      if (id) {
        res.redirect("/make");
      } else {
        res.redirect("/make/add");
      }
    })
    .catch((error) => {
      req.flash("error", error.toString());
      res.redirect("/make/add");
    });
});

makeRouter.get("/delete/(:id)", checkAuth, async (req, res) => {
  const id = req.params.id;
  await axios
    .put(API_URL + "make/delete/" + id)
    .then((response) => {
      req.flash("success", response.data.message);
      res.redirect("/make/");
    })
    .catch((error) => {
      req.flash("error", "Error deleting make " + error);
      res.redirect("/make/");
    });
});

module.exports = makeRouter;
