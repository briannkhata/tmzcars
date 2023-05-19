const express = require("express");
const carRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

carRouter.get("/", async (req, res) => {
  await axios
    .get(API_URL + "make/")
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/makes", {
        data: data,
        title: "Makes",
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
    .get(API_URL + "make/getOne/" + id)
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/addmake", {
        id: id,
        make: data.Make,
        title: "Update Make",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

carRouter.get("/addmake", (req, res) => {
  const data = {
    title: "Add Make",
    id: "",
    make: "",
  };
  res.render("backend/admin/addmake", data);
});

carRouter.post("/save", async (req, res) => {
  const id = req.body.id;
  await axios
    .post(API_URL + "make/save/", {
      Make: req.body.Make,
      MakeId: id,
    })
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      if (id) {
        res.redirect("/make/");
      } else {
        res.redirect("/make/addmake");
      }
    })
    .catch((error) => {
      req.flash("error", "Error saving Make" + error);
      res.redirect("/make/addmake");
    });
});

carRouter.get("/delete/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .put(API_URL + "make/delete/" + id)
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      res.redirect("/make");
    })
    .catch((error) => {
      req.flash("error", "Error deleting Make " + error);
      res.redirect("/make");
    });
});

module.exports = carRouter;
