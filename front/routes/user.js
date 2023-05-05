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

module.exports = userRouter;
