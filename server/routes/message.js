const express = require("express");
const messageController = require("../controllers/MessageController");
const messageRouter = express.Router();
messageRouter.get("/", messageController.getAll);
messageRouter.get("/getSingle/:Id", messageController.getSingle);
messageRouter.put("/delete/:Id", messageController.remove);
messageRouter.put("/update/:Id", messageController.update);
messageRouter.post("/add/", messageController.add);

module.exports = messageRouter;
