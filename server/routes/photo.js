const express = require("express");
const photoController = require("../controllers/photoController");
const photoRouter = express.Router();
photoRouter.get("/", photoController.getAll);
photoRouter.get("/getSingle/:Id", photoController.getSingle);
photoRouter.put("/delete/:Id", photoController.remove);
photoRouter.put("/update/:Id", photoController.update);
photoRouter.post("/add/", photoController.add);

module.exports = photoRouter;
