const express = require("express");
const carRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

carRouter.get("/", async (req, res) => {
  await axios
    .get(API_URL + "steering/")
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/steerings", {
        data: data,
        title: "Steerings",
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
    .get(API_URL + "steering/getOne/" + id)
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/addsteering", {
        id: id,
        steering: data.Steering,
        title: "Update steering",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

carRouter.get("/addsteering", (req, res) => {
  const data = {
    title: "Add steering",
    id: "",
    steering: "",
  };
  res.render("backend/admin/addsteering", data);
});

carRouter.post("/save", async (req, res) => {
  const id = req.body.id;
  await axios
    .post(API_URL + "steering/add/", {
      Steering: req.body.steering,
      SteeringId: id,
    })
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      if (id) {
        res.redirect("/steering/");
      } else {
        res.redirect("/steering/addsteering");
      }
    })
    .catch((error) => {
      req.flash("error", "Error saving steering" + error);
      res.redirect("/steering/addsteering");
    });
});

carRouter.get("/delete/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .put(API_URL + "steering/delete/" + id)
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      res.redirect("/steering");
    })
    .catch((error) => {
      req.flash("error", "Error deleting steering " + error);
      res.redirect("/steering");
    });
});

module.exports = carRouter;
