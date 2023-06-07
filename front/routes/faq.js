const express = require("express");
const faqRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";
const checkAuth = require("../middleware/CheckAuth.js");

faqRouter.get("/", checkAuth, async (req, res) => {
  await axios
    .get(API_URL + "faq/")
    .then((response) => {
      res.render("backend/admin/faqs", {
        data: response.data.data,
        title: "faqs",
        name: req.session.user.Name,
        id: req.session.user.UserId,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

faqRouter.get("/add", checkAuth, async (req, res) => {
  res.render("backend/admin/addfaq", {
    id: "",
    faq: "",
    answer: "",
    title: "Add Faq",
    name: req.session.user.Name,
    id: req.session.user.UserId,
  });
});

faqRouter.get("/edit/(:id)", checkAuth, async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "faq/getOne/" + id)
    .then((response) => {
      res.render("backend/admin/addfaq", {
        id: id,
        faq: response.data.data.Faq,
        answer: response.data.data.Answer,
        title: "Update faq",
        name: req.session.user.Name,
        id: req.session.user.UserId,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

faqRouter.post("/save", checkAuth, async (req, res) => {
  const id = req.body.id;
  const SAVE_URL = id ? `${API_URL}faq/update/` : `${API_URL}faq/add/`;
  await axios
    .post(SAVE_URL, {
      Faq: req.body.Faq,
      Answer: req.body.Answer,
      FaqId: id,
    })
    .then((response) => {
      req.flash("success", response.data.message);
      if (id) {
        res.redirect("/faq");
      } else {
        res.redirect("/faq/add");
      }
    })
    .catch((error) => {
      req.flash("error", error.toString());
      res.redirect("/faq/add");
    });
});

faqRouter.get("/delete/(:id)", async (req, res) => {
  await axios
    .put(API_URL + "faq/delete/" + req.params.id)
    .then((response) => {
      req.flash("success", response.data.message);
      res.redirect("/faq/");
    })
    .catch((error) => {
      req.flash("error", "Error deleting faq " + error);
      res.redirect("/faq/");
    });
});

module.exports = faqRouter;
