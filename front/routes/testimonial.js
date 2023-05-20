const express = require("express");
const testimonialRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

testimonialRouter.get("/", async (req, res) => {
  await axios
    .get(API_URL + "testimonial/")
    .then((response) => {
      res.render("backend/admin/testimonials", {
        data: response.data.data,
        title: "testimonials",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

testimonialRouter.get("/add", async (req, res) => {
  res.render("backend/admin/addtestimonial", {
    id: "",
    testimonial: "",
    role: "",
    userId: "",
    title: "Add testimonial",
  });
});

testimonialRouter.get("/edit/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "testimonial/getOne/" + id)
    .then((response) => {
      res.render("backend/admin/addtestimonial", {
        id: id,
        testimonial: response.data.data.Testimonial,
        role: response.data.data.Role,
        userId: response.data.data.UserId,
        title: "Update Testimonial",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

testimonialRouter.post("/save", async (req, res) => {
  const id = req.body.id;
  const SAVE_URL = id
    ? `${API_URL}testimonial/update/`
    : `${API_URL}testimonial/add/`;
  await axios
    .post(SAVE_URL, {
      Testimonial: req.body.Testimonial,
      Role: req.body.Role,
      UserId: req.body.UserId,
      TestimonialId: id,
    })
    .then((response) => {
      req.flash("success", response.data.message);
      if (id) {
        res.redirect("/testimonial");
      } else {
        res.redirect("/testimonial/add");
      }
    })
    .catch((error) => {
      req.flash("error", error.toString());
      res.redirect("/testimonial/add");
    });
});

testimonialRouter.get("/delete/(:id)", async (req, res) => {
  await axios
    .put(API_URL + "testimonial/delete/" + req.params.id)
    .then((response) => {
      req.flash("success", response.data.message);
      res.redirect("/testimonial/");
    })
    .catch((error) => {
      req.flash("error", "Error deleting testimonial " + error);
      res.redirect("/testimonial/");
    });
});

module.exports = testimonialRouter;
