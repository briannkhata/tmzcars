const express = require("express");
const settingRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

settingRouter.get("/", async (req, res) => {
  await axios
    .get(API_URL + "setting/")
    .then((response) => {
      const data = response.data.data;
      console.log(data);
      res.render("backend/admin/settings", {
        id: data.Id,
        phone: data.Phone,
        email: data.Email,
        address: data.Address,
        app: data.App,
        data: response.data.data,
        title: "Settings",
        name: req.session.user.Name,
        id: req.session.user.UserId,
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

settingRouter.post("/add", async (req, res) => {
  await axios
    .post(API_URL + "setting/add/", {
      App: req.body.App,
      Phone: req.body.Phone,
      Email: req.body.Email,
      Address: req.body.Address,
      Id: req.body.Id,
    })
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      res.redirect("/setting/");
    })
    .catch((error) => {
      req.flash("error", "Error saving settings" + error.toString());
      res.redirect("/setting/");
    });
});

module.exports = settingRouter;
