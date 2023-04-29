const express = require("express");
const exteriorController = require("../controllers/ExteriorController");
const exteriorRouter = express.Router();
exteriorRouter.get("/", exteriorController.getAll);
exteriorRouter.get("/getSingle/:Id", exteriorController.getSingle);
exteriorRouter.put("/delete/:Id", exteriorController.remove);
exteriorRouter.put("/update/:Id", exteriorController.update);
exteriorRouter.post("/add/", exteriorController.add);

module.exports = exteriorRouter;
