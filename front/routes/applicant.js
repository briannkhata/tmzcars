const express = require("express");
const applicantRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

applicantRouter.get("/", async (req, res) => {
  await axios
    .get(API_URL + "applicant/")
    .then((response) => {
      res.render("backend/admin/applicants", {
        data: response.data.data,
        title: "applicants",
        name: req.session.user.Name,
        id: req.session.user.UserId,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

applicantRouter.get("/add", async (req, res) => {
  res.render("backend/admin/addapplicant", {
    id: "",
    applicant: "",
    title: "Add applicant",
    name: req.session.user.Name,
    id: req.session.user.UserId,
  });
});

applicantRouter.get("/edit/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "applicant/getOne/" + id)
    .then((response) => {
      res.render("backend/admin/addapplicant", {
        id: id,
        applicant: response.data.data.applicant,
        title: "Update applicant",
        name: req.session.user.Name,
        id: req.session.user.UserId,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

applicantRouter.post("/save", async (req, res) => {
  const id = req.body.id;
  const SAVE_URL = id
    ? `${API_URL}applicant/update/`
    : `${API_URL}applicant/add/`;
  await axios
    .post(SAVE_URL, {
      Name: req.body.Name,
      Email: req.body.Email,
      Phone: req.body.Phone,
      Location: req.body.Location,
      Post: req.body.Post,
      Qualification: req.body.Qualification,
      ApplicantId: id,
    })
    .then((response) => {
      req.flash("success", response.data.message);
      if (id) {
        res.redirect("/applicant");
      } else {
        res.redirect("/applicant/add");
      }
    })
    .catch((error) => {
      req.flash("error", error.toString());
      res.redirect("/applicant/add");
    });
});

applicantRouter.get("/delete/(:id)", async (req, res) => {
  await axios
    .put(API_URL + "applicant/delete/" + req.params.id)
    .then((response) => {
      req.flash("success", response.data.message);
      res.redirect("/applicant/");
    })
    .catch((error) => {
      req.flash("error", "Error deleting application " + error);
      res.redirect("/applicant/");
    });
});

module.exports = applicantRouter;
