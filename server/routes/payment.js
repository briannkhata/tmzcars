const express = require("express");
const paymentController = require("../controllers/PaymentController");
const paymentRouter = express.Router();
paymentRouter.get("/", paymentController.getAll);
paymentRouter.get("/getSingle/:Id", paymentController.getSingle);
paymentRouter.put("/delete/:Id", paymentController.remove);
paymentRouter.put("/update/:Id", paymentController.update);
paymentRouter.post("/add/", paymentController.add);

module.exports = paymentRouter;
