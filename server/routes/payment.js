const express = require("express");
const paymentController = require("../controllers/PaymentController");
const paymentRouter = express.Router();
paymentRouter.get("/", paymentController.getAll);
paymentRouter.post("/add/", paymentController.add);

module.exports = paymentRouter;
