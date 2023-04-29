const express = require("express");
const userController = require("../controllers/UserController");
const userRouter = express.Router();
userRouter.get("/", userController.getAll);
userRouter.get("/getSingle/:Id", userController.getSingle);
userRouter.put("/delete/:Id", userController.remove);
userRouter.put("/update/:Id", userController.update);
userRouter.post("/add/", userController.add);

module.exports = userRouter;
