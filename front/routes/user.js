const express = require("express");
const userRouter = express.Router();
const axios = require("axios");

const API_URL = "http://127.0.0.1:7002/api/v1/";

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

userRouter.get("/admins", async (req, res) => {
  await axios
    .get(API_URL + "user/getAdmins/")
    .then((response) => {
      res.render("backend/admin/admins", {
        data: response.data.data,
        title: "Admins",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

userRouter.get("/users", async (req, res) => {
  await axios
    .get(API_URL + "user/getSellers/")
    .then((response) => {
      res.render("backend/admin/users", {
        data: response.data.data,
        title: "Users",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

userRouter.get("/confirmed", async (req, res) => {
  await axios
    .get(API_URL + "user/getConfirmed/")
    .then((response) => {
      res.render("backend/admin/confirmedusers", {
        data: response.data.data,
        title: "Confirmed Users",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = userRouter;
