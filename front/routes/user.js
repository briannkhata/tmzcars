const express = require("express");
const userRouter = express.Router();
const axios = require("axios");

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

userRouter.get("/settings", (req, res) => {
  const data = {
    title: "Settings",
  };
  res.render("backend/admin/settings", data);
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

module.exports = userRouter;
