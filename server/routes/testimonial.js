const express = require("express");
const testimonialController = require("../controllers/TestimonialController");
const testimonialRouter = express.Router();
testimonialRouter.get("/", testimonialController.getAll);
testimonialRouter.get("/getSingle/:Id", testimonialController.getSingle);
testimonialRouter.put("/delete/:Id", testimonialController.remove);
testimonialRouter.put("/update/:Id", testimonialController.update);
testimonialRouter.post("/add/", testimonialController.add);

module.exports = testimonialRouter;
