const express = require("express");
const idtypeController = require("../controllers/IdtypeController");
const idtypeRouter = express.Router();
idtypeRouter.get("/", idtypeController.getAll);
idtypeRouter.get("/getOne/:Id", idtypeController.getSingle);
idtypeRouter.put("/delete/:Id", idtypeController.remove);
idtypeRouter.put("/update/:Id", idtypeController.update);
idtypeRouter.post("/add/", idtypeController.add);

module.exports = idtypeRouter;
