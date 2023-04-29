const express = require("express");
const partnerController = require("../controllers/PartnerController");
const partnerRouter = express.Router();
partnerRouter.get("/", partnerController.getAll);
partnerRouter.get("/getSingle/:Id", partnerController.getSingle);
partnerRouter.put("/delete/:Id", partnerController.remove);
partnerRouter.put("/update/:Id", partnerController.update);
partnerRouter.post("/add/", partnerController.add);

module.exports = partnerRouter;
