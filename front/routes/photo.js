const express = require("express");
const photoRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

photoRouter.get("/", async (req, res) => {
  await axios
    .get(API_URL + "photo/")
    .then((response) => {
      res.render("backend/admin/photos", {
        data: response.data.data,
        title: "photos",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

photoRouter.get("/add", async (req, res) => {
  res.render("backend/admin/addphoto", {
    id: "",
    photo: "",
    title: "Add photo",
  });
});

photoRouter.get("/edit/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "photo/getOne/" + id)
    .then((response) => {
      res.render("backend/admin/addphoto", {
        id: id,
        photo: response.data.data.photo,
        title: "Update photo",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

photoRouter.post("/save", async (req, res) => {
  const id = req.body.id;
  const SAVE_URL = id ? `${API_URL}photo/update/` : `${API_URL}photo/add/`;
  await axios
    .post(SAVE_URL, {
      photo: req.body.photo,
      photoId: id,
    })
    .then((response) => {
      req.flash("success", response.data.message);
      if (id) {
        res.redirect("/photo");
      } else {
        res.redirect("/photo/add");
      }
    })
    .catch((error) => {
      req.flash("error", error.toString());
      res.redirect("/photo/add");
    });
});

photoRouter.get("/delete/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .put(API_URL + "photo/delete/" + id)
    .then((response) => {
      req.flash("success", response.data.message);
      res.redirect("/photo/");
    })
    .catch((error) => {
      req.flash("error", "Error deleting photo " + error);
      res.redirect("/photo/");
    });
});

module.exports = photoRouter;
