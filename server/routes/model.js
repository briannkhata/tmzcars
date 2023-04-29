const express = require("express");
const modelController = require("../controllers/ModelController");
const modelRouter = express.Router();
modelRouter.get("/", modelController.getAll);
modelRouter.get("/getSingle/:Id", modelController.getSingle);
modelRouter.put("/delete/:Id", modelController.remove);
modelRouter.put("/update/:Id", modelController.update);
modelRouter.post("/add/", modelController.add);

module.exports = modelRouter;
