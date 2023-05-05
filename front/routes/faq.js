const express = require("express");
const faqRouter = express.Router();
const axios = require("axios");

faqRouter.get("/addfaq", (req, res) => {
  const data = {
    title: "Add FAQ",
  };
  res.render("backend/admin/addfaq", data);
});

faqRouter.get("/faqs", (req, res) => {
  const data = {
    title: "FAQs",
  };
  res.render("backend/admin/faqs", data);
});

faqRouter.get("/changepassword", (req, res) => {
  const data = {
    title: "Change Password",
  };
  res.render("backend/admin/changepassword", data);
});

faqRouter.get("/changephone", (req, res) => {
  const data = {
    title: "Change Phone",
  };
  res.render("backend/admin/changephone", data);
});

module.exports = faqRouter;
