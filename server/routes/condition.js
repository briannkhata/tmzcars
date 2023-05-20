const express = require("express");
const conditionController = require("../controllers/ConditionController");
const conditionRouter = express.Router();
conditionRouter.get("/", conditionController.getAll);
conditionRouter.get("/getOne/:Id", conditionController.getSingle);
conditionRouter.put("/delete/:Id", conditionController.remove);
conditionRouter.post("/update/", conditionController.update);
conditionRouter.post("/add/", conditionController.add);

module.exports = conditionRouter;
