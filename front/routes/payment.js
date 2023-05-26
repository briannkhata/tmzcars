const express = require("express");
const paymentRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

paymentRouter.get("/", async (req, res) => {
  await axios
    .get(API_URL + "payment/")
    .then((response) => {
      res.render("backend/admin/payments", {
        data: response.data.data,
        title: "payments",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

paymentRouter.get("/add", async (req, res) => {
  res.render("backend/admin/addpayment", {
    id: "",
    payment: "",
    title: "Add payment",
  });
});

paymentRouter.get("/edit/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "payment/getOne/" + id)
    .then((response) => {
      res.render("backend/admin/addpayment", {
        id: id,
        payment: response.data.data.payment,
        title: "Update payment",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

paymentRouter.post("/save", async (req, res) => {
  const id = req.body.id;
  const SAVE_URL = id ? `${API_URL}payment/update/` : `${API_URL}payment/add/`;
  await axios
    .post(SAVE_URL, {
      payment: req.body.payment,
      paymentId: id,
    })
    .then((response) => {
      req.flash("success", response.data.message);
      if (id) {
        res.redirect("/payment");
      } else {
        res.redirect("/payment/add");
      }
    })
    .catch((error) => {
      req.flash("error", error.toString());
      res.redirect("/payment/add");
    });
});

paymentRouter.get("/delete/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .put(API_URL + "payment/delete/" + id)
    .then((response) => {
      req.flash("success", response.data.message);
      res.redirect("/payment/");
    })
    .catch((error) => {
      req.flash("error", "Error deleting payment " + error);
      res.redirect("/payment/");
    });
});

module.exports = paymentRouter;
