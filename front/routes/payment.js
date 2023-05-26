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

paymentRouter.post("/save", async (req, res) => {
  const SAVE_URL = `${API_URL}payment/add/`;
  const action = "FEATURE_";
  const payMethod = "Mpamba";
  await axios
    .post(SAVE_URL, {
      TransId: action,
      Amount: 5000,
      PaymentMethod: payMethod,
      CarId: "",
    })
    .then((response) => {
      console.log(response.data.message);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = paymentRouter;
