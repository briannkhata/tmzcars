const express = require("express");
const transmissionRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

transmissionRouter.get("/", async (req, res) => {
  await axios
    .get(API_URL + "transmission/")
    .then((response) => {
      res.render("backend/admin/transmissions", {
        data: response.data.data,
        title: "transmissions",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

transmissionRouter.get("/add", async (req, res) => {
  res.render("backend/admin/addtransmission", {
    id: "",
    transmission: "",
    title: "Add transmission",
  });
});

transmissionRouter.get("/edit/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "transmission/getOne/" + id)
    .then((response) => {
      res.render("backend/admin/addtransmission", {
        id: id,
        transmission: response.data.data.Transmission,
        title: "Update Transmission",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

transmissionRouter.post("/save", async (req, res) => {
  const id = req.body.id;
  const SAVE_URL = id
    ? `${API_URL}transmission/update/`
    : `${API_URL}transmission/add/`;
  await axios
    .post(SAVE_URL, {
      Transmission: req.body.Transmission,
      TransmissionId: id,
    })
    .then((response) => {
      req.flash("success", response.data.message);
      if (id) {
        res.redirect("/transmission");
      } else {
        res.redirect("/transmission/add");
      }
    })
    .catch((error) => {
      req.flash("error", error.toString());
      res.redirect("/transmission/add");
    });
});

transmissionRouter.get("/delete/(:id)", async (req, res) => {
  await axios
    .put(API_URL + "transmission/delete/" + req.params.id)
    .then((response) => {
      req.flash("success", response.data.message);
      res.redirect("/transmission/");
    })
    .catch((error) => {
      req.flash("error", "Error deleting transmission " + error);
      res.redirect("/transmission/");
    });
});

module.exports = transmissionRouter;
