const express = require("express");
const planController = require("../controllers/PlanController");
const planRouter = express.Router();
planRouter.get("/", planController.getAll);
planRouter.get("/getSingle/:Id", planController.getSingle);
planRouter.put("/delete/:Id", planController.remove);
planRouter.put("/update/:Id", planController.update);
planRouter.post("/add/", planController.add);

module.exports = planRouter;
