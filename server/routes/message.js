const express = require("express");
const messageController = require("../controllers/MessageController");
const messageRouter = express.Router();
messageRouter.get("/", messageController.getAll);
messageRouter.get("/getSingle/:Id", messageController.getSingle);
messageRouter.post("/add/", messageController.add);

module.exports = messageRouter;
