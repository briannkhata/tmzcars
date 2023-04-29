const express = require("express");
const applicantController = require("../controllers/ApplicantController");
const applicantRouter = express.Router();
applicantRouter.get("/", applicantController.getAll);
applicantRouter.get("/getSingle/:Id", applicantController.getSingle);
applicantRouter.put("/delete/:Id", applicantController.remove);
applicantRouter.put("/update/:Id", applicantController.update);
applicantRouter.post("/add/", applicantController.add);

module.exports = applicantRouter;
