const express = require("express");
const bodyController = require("../controllers/BodyController");
const bodyRouter = express.Router();
bodyRouter.get("/", bodyController.getAll);
bodyRouter.get("/getSingle/:Id", bodyController.getSingle);
bodyRouter.put("/delete/:Id", bodyController.remove);
bodyRouter.put("/update/:Id", bodyController.update);
bodyRouter.post("/add/", bodyController.add);

module.exports = bodyRouter;
