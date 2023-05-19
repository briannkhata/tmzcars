const express = require("express");
const fueltypeController = require("../controllers/FueltypeController");
const fueltypeRouter = express.Router();
fueltypeRouter.get("/", fueltypeController.getAll);
fueltypeRouter.get("/getOne/:Id", fueltypeController.getSingle);
fueltypeRouter.put("/delete/:Id", fueltypeController.remove);
fueltypeRouter.put("/update/:Id", fueltypeController.update);
fueltypeRouter.post("/add/", fueltypeController.add);

module.exports = fueltypeRouter;
