const express = require("express");
const enquiryController = require("../controllers/EnquiryController");
const enquiryRouter = express.Router();
enquiryRouter.get("/", enquiryController.getAll);
enquiryRouter.get("/getSingle/:Id", enquiryController.getSingle);
enquiryRouter.delete("/delete/:Id", enquiryController.remove);
enquiryRouter.put("/update/:Id", enquiryController.update);
enquiryRouter.post("/add/", enquiryController.add);

module.exports = enquiryRouter;
