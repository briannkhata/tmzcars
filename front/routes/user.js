const express = require("express");
const userRouter = express.Router();
const axios = require("axios");

const API_URL = "http://127.0.0.1:7002/api/v1/";

userRouter.get("/addcar", (req, res) => {
  const data = {
    title: "Add Car",
  };
  res.render("backend/admin/addcar", data);
});

userRouter.get("/verifyaccount", (req, res) => {
  const data = {
    title: "Verify Account",
  };
  res.render("backend/admin/verifyaccount", data);
});

userRouter.get("/changepassword", (req, res) => {
  const data = {
    title: "Change Password",
  };
  res.render("backend/admin/changepassword", data);
});

userRouter.get("/changephone", (req, res) => {
  const data = {
    title: "Change Phone",
  };
  res.render("backend/admin/changephone", data);
});

userRouter.get("/messages", (req, res) => {
  const data = {
    title: "Messages",
  };
  res.render("backend/admin/messages", data);
});

userRouter.get("/testimonials", (req, res) => {
  const data = {
    title: "Testimonials",
  };
  res.render("backend/admin/testimonials", data);
});

userRouter.get("/payments", (req, res) => {
  const data = {
    title: "Payments",
  };
  res.render("backend/admin/payments", data);
});

userRouter.get("/settings", async (req, res) => {
  await axios
    .get(API_URL + "setting/")
    .then((response) => {
      const data = response.data.data[0];
      res.render("backend/admin/settings", {
        id: data.Id,
        phone: data.Phone,
        email: data.Email,
        address: data.Address,
        app: data.App,
        title: "Settings",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

userRouter.get("/admins", (req, res) => {
  const data = {
    title: "Admin Users",
  };
  res.render("backend/admin/admins", data);
});

userRouter.get("/users", (req, res) => {
  const data = {
    title: "Users",
  };
  res.render("backend/admin/users", data);
});

userRouter.post("/savesettings", async (req, res) => {
  await axios
    .post(API_URL + "setting/add/", {
      App: req.body.App,
      Phone: req.body.Phone,
      Email: req.body.Email,
      Address: req.body.Address,
      Id: req.body.Id,
    })
    .then((response) => {
      req.flash("success", "Saving settings successfull");
      res.redirect("/user/settings");
    })
    .catch((error) => {
      req.flash("error", "Error saving settings" + error);
      res.redirect("/user/settings");
    });
});

module.exports = userRouter;
