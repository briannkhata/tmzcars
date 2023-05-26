const express = require("express");
const featureController = require("../controllers/FeatureController");
const featureRouter = express.Router();
featureRouter.get("/", featureController.getAll);
featureRouter.get("/getOne/:Id", featureController.getSingle);
featureRouter.put("/delete/:Id", featureController.remove);
featureRouter.put("/update/:Id", featureController.update);
featureRouter.post("/add/", featureController.add);

module.exports = featureRouter;
