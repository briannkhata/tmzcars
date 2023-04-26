const express = require("express");
const carController = require("../controllers/CarController.js");
const router = express.Router();
router.get("/", carController.getAll);
router.get("/getOne/:id", carController.getOne);
router.put("/remove/:id", carController.remove);
router.put("/update/:id", carController.update);

module.exports = router;
