const express = require("express");
const carRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

carRouter.get("/", async (req, res) => {
  await axios
    .get(API_URL + "condition/")
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/conditions", {
        data: data,
        title: "Conditions",
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
    .get(API_URL + "condition/getOne/" + id)
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/addcondition", {
        id: id,
        condition: data.Condition,
        title: "Update condition",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

carRouter.get("/addcondition", (req, res) => {
  const data = {
    title: "Add condition",
    id: "",
    condition: "",
  };
  res.render("backend/admin/addcondition", data);
});

carRouter.post("/save", async (req, res) => {
  const id = req.body.id;
  await axios
    .post(API_URL + "condition/add/", {
      Condition: req.body.condition,
      ConditionId: id,
    })
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      if (id) {
        res.redirect("/condition/");
      } else {
        res.redirect("/condition/addcondition");
      }
    })
    .catch((error) => {
      req.flash("error", "Error saving condition" + error);
      res.redirect("/condition/addcondition");
    });
});

carRouter.get("/delete/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .put(API_URL + "condition/delete/" + id)
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      res.redirect("/condition");
    })
    .catch((error) => {
      req.flash("error", "Error deleting condition " + error);
      res.redirect("/condition");
    });
});

module.exports = carRouter;
