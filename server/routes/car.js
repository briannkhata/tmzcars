const express = require("express");
const carController = require("../controllers/CarController.js");
const carRouter = express.Router();
carRouter.get("/", carController.getAll);
carRouter.get("/getOne/:CarId", carController.getOne);
carRouter.get("/getByCategory/:CategoryId", carController.getByCategory);
carRouter.put("/remove/:CarId", carController.remove);
carRouter.put("/update/:CarId", carController.update);
carRouter.post("/search", carController.searchCar);
carRouter.post("/add", carController.addCar);

module.exports = carRouter;
