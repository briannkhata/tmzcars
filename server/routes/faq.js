const express = require("express");
const faqController = require("../controllers/FaqController");
const faqRouter = express.Router();
faqRouter.get("/", faqController.getAll);
faqRouter.get("/getSingle/:Id", faqController.getSingle);
faqRouter.put("/delete/:Id", faqController.remove);
faqRouter.put("/update/:Id", faqController.update);
faqRouter.post("/add/", faqController.add);

module.exports = faqRouter;
