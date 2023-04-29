const express = require("express");
const interiorController = require("../controllers/InteriorController");
const interiorRouter = express.Router();
interiorRouter.get("/", interiorController.getAll);
interiorRouter.get("/getSingle/:Id", interiorController.getSingle);
interiorRouter.put("/delete/:Id", interiorController.remove);
interiorRouter.put("/update/:Id", interiorController.update);
interiorRouter.post("/add/", interiorController.add);

module.exports = interiorRouter;
