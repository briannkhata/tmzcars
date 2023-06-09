const express = require("express");
const userController = require("../controllers/UserController");
const userRouter = express.Router();
userRouter.get("/", userController.getAll);
userRouter.get("/getOne/:Id", userController.getSingle);
userRouter.get("/logout/", userController.logout);
userRouter.put("/delete/:Id", userController.remove);
userRouter.post("/updatephone/", userController.updatephone);
userRouter.post("/updatepassword", userController.updatepassword);
userRouter.post("/verifyaccount/", userController.verifyaccount);
userRouter.get("/getAdmins/", userController.getAdmins);
userRouter.get("/getSellers/", userController.getSellers);
userRouter.get("/getRentals/", userController.getRentals);
userRouter.get("/getConfirmed/", userController.getConfirmed);
userRouter.post("/add/", userController.addadmin);
userRouter.post("/update/", userController.updateadmin);
userRouter.post("/updateprofile/", userController.updateprofile);

module.exports = userRouter;
