const express = require("express");
const paymentRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";
const checkAuth = require("../middleware/CheckAuth.js");

paymentRouter.get("/", checkAuth, async (req, res) => {
  await axios
    .get(API_URL + "payment/")
    .then((response) => {
      res.render(
        "backend/" + req.session.user.Role.toLowerCase() + "/payments",
        {
          data: response.data.data,
          title: "Payments",
          name: req.session.user.Name,
          userId: req.session.user.UserId,
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

paymentRouter.post("/save", checkAuth, async (req, res) => {
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
