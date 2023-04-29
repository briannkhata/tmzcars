const express = require("express");
const settingController = require("../controllers/SettingController");
const settingRouter = express.Router();
settingRouter.get("/", settingController.getAll);
settingRouter.get("/getSingle/:Id", settingController.getSingle);
settingRouter.put("/delete/:Id", settingController.remove);
settingRouter.put("/update/:Id", settingController.update);
settingRouter.post("/add/", settingController.add);

module.exports = settingRouter;
