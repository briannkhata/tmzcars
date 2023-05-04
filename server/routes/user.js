const express = require("express");
const userController = require("../controllers/UserController");
const userRouter = express.Router();
userRouter.get("/", userController.getAll);
userRouter.get("/getSingle/:Id", userController.getSingle);
userRouter.get("/logout/", userController.logout);
userRouter.put("/delete/:Id", userController.remove);
userRouter.put("/updateProfle/:Id", userController.updateProfile);
userRouter.put("/updateProfle/:Id", userController.updateProfile);
userRouter.put("/changePassword/:Id", userController.changePassword);
userRouter.put("/changePhone/:Id", userController.changePhone);
userRouter.put("/changeProfile/:Id", userController.changeProfile);
userRouter.put("/verifyAccount/:Id", userController.verifyAccount);

module.exports = userRouter;
