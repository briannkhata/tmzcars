const express = require("express");
const settingController = require("../controllers/SettingController");
const settingRouter = express.Router();
settingRouter.get("/", settingController.getAll);
settingRouter.post("/add", settingController.add);

module.exports = settingRouter;
