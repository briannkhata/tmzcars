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
        title: "Payments",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = paymentRouter;
