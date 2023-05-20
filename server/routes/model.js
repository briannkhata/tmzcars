const express = require("express");
const modelController = require("../controllers/ModelController");
const modelRouter = express.Router();
modelRouter.get("/", modelController.getAll);
modelRouter.get("/getOne/:Id", modelController.getSingle);
modelRouter.put("/delete/:Id", modelController.remove);
modelRouter.post("/update/", modelController.update);
modelRouter.post("/add/", modelController.add);

module.exports = modelRouter;
