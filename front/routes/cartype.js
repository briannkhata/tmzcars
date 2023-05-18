const express = require("express");
const cartypeRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

cartypeRouter.get("/", async (req, res) => {
  await axios
    .get(API_URL + "cartype/")
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/cartypes", {
        data: data,
        title: "Cartypes",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

cartypeRouter.get("/edit/(:id)", async (req, res) => {
  id = req.params.id;
  await axios
    .get(API_URL + "cartype/getOne/" + id)
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/addcartype", {
        id: id,
        cartype: data.CarType,
        title: "Update cartype",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

cartypeRouter.get("/addcartype", (req, res) => {
  const data = {
    title: "Add cartype",
    id: "",
    cartype: "",
  };
  res.render("backend/admin/addcartype", data);
});

cartypeRouter.post("/save", async (req, res) => {
  const id = req.body.id;
  await axios
    .post(API_URL + "cartype/add/", {
      Cartype: req.body.cartype,
      CartypeId: id,
    })
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      if (id) {
        res.redirect("/cartype/");
      } else {
        res.redirect("/cartype/addcartype");
      }
    })
    .catch((error) => {
      req.flash("error", "Error saving cartype" + error);
      res.redirect("/cartype/addcartype");
    });
});

cartypeRouter.get("/delete/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .put(API_URL + "cartype/delete/" + id)
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      res.redirect("/cartype");
    })
    .catch((error) => {
      req.flash("error", "Error deleting cartype " + error);
      res.redirect("/cartype");
    });
});

module.exports = cartypeRouter;
