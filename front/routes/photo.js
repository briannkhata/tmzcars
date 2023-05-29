const express = require("express");
const makeRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

makeRouter.get("/", async (req, res) => {
  await axios
    .get(API_URL + "make/")
    .then((response) => {
      res.render("backend/admin/makes", {
        data: response.data.data,
        title: "Makes",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

makeRouter.get("/add", async (req, res) => {
  res.render("backend/admin/addmake", {
    id: "",
    make: "",
    title: "Add make",
  });
});

makeRouter.get("/edit/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "make/getOne/" + id)
    .then((response) => {
      res.render("backend/admin/addmake", {
        id: id,
        make: response.data.data.make,
        title: "Update make",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

makeRouter.post("/save", async (req, res) => {
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

makeRouter.get("/delete/(:id)", async (req, res) => {
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
