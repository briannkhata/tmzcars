const express = require("express");
const applicantController = require("../controllers/ApplicantController");
const applicantRouter = express.Router();
applicantRouter.get("/", applicantController.getAll);
applicantRouter.get("/getOne/:Id", applicantController.getSingle);
applicantRouter.put("/delete/:Id", applicantController.remove);
applicantRouter.post("/update/", applicantController.update);
applicantRouter.post("/add/", applicantController.add);

module.exports = applicantRouter;
