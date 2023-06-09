const express = require("express");
const conditionRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";
const checkAuth = require("../middleware/CheckAuth.js");

conditionRouter.get("/", checkAuth, async (req, res) => {
  await axios
    .get(API_URL + "condition/")
    .then((response) => {
      res.render(
        "backend/" + req.session.user.Role.toLowerCase() + "/conditions",
        {
          data: response.data.data,
          title: "Conditions",
          name: req.session.user.Name,
          userId: req.session.user.UserId,
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

conditionRouter.get("/add", checkAuth, async (req, res) => {
  res.render(
    "backend/" + req.session.user.Role.toLowerCase() + "/addcondition",
    {
      id: "",
      condition: "",
      title: "Add condition",
      name: req.session.user.Name,
      userId: req.session.user.UserId,
    }
  );
});

conditionRouter.get("/edit/(:id)", checkAuth, async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "condition/getOne/" + id)
    .then((response) => {
      res.render(
        "backend/" + req.session.user.Role.toLowerCase() + "/addcondition",
        {
          id: id,
          condition: response.data.data.Condition,
          title: "Update condition",
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

conditionRouter.post("/save", checkAuth, async (req, res) => {
  const id = req.body.id;
  const SAVE_URL = id
    ? `${API_URL}condition/update/`
    : `${API_URL}condition/add/`;
  await axios
    .post(SAVE_URL, {
      Condition: req.body.Condition,
      ConditionId: id,
    })
    .then((response) => {
      req.flash("success", response.data.message);
      if (id) {
        res.redirect("/condition");
      } else {
        res.redirect("/condition/add");
      }
    })
    .catch((error) => {
      req.flash("error", error.toString());
      res.redirect("/condition/add");
    });
});

conditionRouter.get("/delete/(:id)", checkAuth, async (req, res) => {
  await axios
    .put(API_URL + "condition/delete/" + req.params.id)
    .then((response) => {
      req.flash("success", response.data.message);
      res.redirect("/condition/");
    })
    .catch((error) => {
      req.flash("error", "Error deleting condition " + error);
      res.redirect("/condition/");
    });
});

module.exports = conditionRouter;
