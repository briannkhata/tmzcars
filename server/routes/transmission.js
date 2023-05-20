const express = require("express");
const transmissionController = require("../controllers/TransmissionController");
const transmissionRouter = express.Router();
transmissionRouter.get("/", transmissionController.getAll);
transmissionRouter.get("/getOne/:Id", transmissionController.getSingle);
transmissionRouter.put("/delete/:Id", transmissionController.remove);
transmissionRouter.post("/update/", transmissionController.update);
transmissionRouter.post("/add/", transmissionController.add);

module.exports = transmissionRouter;
