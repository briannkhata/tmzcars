const express = require("express");
const transmissionRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

transmissionRouter.get("/", async (req, res) => {
  await axios
    .get(API_URL + "transmission/")
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/transmissions", {
        data: data,
        title: "Transmissions",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

transmissionRouter.get("/edit/(:id)", async (req, res) => {
  id = req.params.id;
  await axios
    .get(API_URL + "transmission/getOne/" + id)
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/addtransmission", {
        id: id,
        transmission: data.Transmission,
        title: "Update Transmission",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

transmissionRouter.get("/add", (req, res) => {
  const data = {
    title: "Add transmission",
    id: "",
    transmission: "",
  };
  res.render("backend/admin/addtransmission", data);
});

transmissionRouter.post("/save", async (req, res) => {
  const id = req.body.id;
  await axios
    .post(API_URL + "transmission/add/", {
      Transmission: req.body.transmission,
      TransmissionId: id,
    })
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      if (id) {
        res.redirect("/transmission/");
      } else {
        res.redirect("/transmission/add");
      }
    })
    .catch((error) => {
      req.flash("error", "Error saving transmission" + error);
      res.redirect("/transmission/add");
    });
});

transmissionRouter.get("/delete/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .put(API_URL + "transmission/delete/" + id)
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      res.redirect("/transmission");
    })
    .catch((error) => {
      req.flash("error", "Error deleting transmission " + error);
      res.redirect("/transmission");
    });
});

module.exports = transmissionRouter;
