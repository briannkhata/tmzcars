const express = require("express");
const cartypeController = require("../controllers/CartypeController");
const cartypeRouter = express.Router();
cartypeRouter.get("/", cartypeController.getAll);
cartypeRouter.get("/getSingle/:Id", cartypeController.getSingle);
cartypeRouter.put("/delete/:Id", cartypeController.remove);
cartypeRouter.put("/update/", cartypeController.update);
cartypeRouter.post("/add", cartypeController.add);

module.exports = cartypeRouter;
