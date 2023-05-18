const express = require("express");
const steeringController = require("../controllers/SteeringController");
const steeringRouter = express.Router();
steeringRouter.get("/", steeringController.getAll);
steeringRouter.get("/getOne/:Id", steeringController.getSingle);
steeringRouter.put("/delete/:Id", steeringController.remove);
steeringRouter.put("/update/:Id", steeringController.update);
steeringRouter.post("/add/", steeringController.add);

module.exports = steeringRouter;
