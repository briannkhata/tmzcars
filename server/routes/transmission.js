const express = require("express");
const transmissionController = require("../controllers/TransmissionController");
const transmissionRouter = express.Router();
transmissionRouter.get("/", transmissionController.getAll);
transmissionRouter.get("/getSingle/:Id", transmissionController.getSingle);
transmissionRouter.put("/delete/:Id", transmissionController.remove);
transmissionRouter.put("/update/:Id", transmissionController.update);
transmissionRouter.post("/add/", transmissionController.add);

module.exports = transmissionRouter;
