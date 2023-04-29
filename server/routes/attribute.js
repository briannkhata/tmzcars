const express = require("express");
const attributeController = require("../controllers/AttributeController");
const attributeRouter = express.Router();
attributeRouter.get("/", attributeController.getAll);
attributeRouter.get("/getSingle/:Id", attributeController.getSingle);
attributeRouter.put("/delete/:Id", attributeController.remove);
attributeRouter.put("/update/:Id", attributeController.update);
attributeRouter.post("/add/", attributeController.add);

module.exports = attributeRouter;
