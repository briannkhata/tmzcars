const express = require("express");
const fueltypeController = require("../controllers/FueltypeController");
const fueltypeRouter = express.Router();
fueltypeRouter.get("/", fueltypeController.getAll);
fueltypeRouter.get("/getOne/:Id", fueltypeController.getSingle);
fueltypeRouter.put("/delete/:Id", fueltypeController.remove);
fueltypeRouter.post("/update/", fueltypeController.update);
fueltypeRouter.post("/add/", fueltypeController.add);

module.exports = fueltypeRouter;
