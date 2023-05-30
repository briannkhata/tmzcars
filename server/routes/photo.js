const express = require("express");
const photoController = require("../controllers/PhotoController");
const photoRouter = express.Router();
photoRouter.get("/", photoController.getAll);
photoRouter.get("/getOne/:Id", photoController.getSingle);
photoRouter.get("/getCarImages/:Id", photoController.getCarImages);
photoRouter.delete("/remove/:Id", photoController.remove);
photoRouter.post("/add/", photoController.add);
photoRouter.get("/getRandomImage/", photoController.getRandomImage);

module.exports = photoRouter;
