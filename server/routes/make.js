const express = require("express");
const makeController = require("../controllers/MakeController");
const makeRouter = express.Router();
makeRouter.get("/", makeController.getAll);
makeRouter.get("/getOne/:Id", makeController.getSingle);
makeRouter.post("/delete/:Id", makeController.remove);
makeRouter.post("/save/", makeController.save);

module.exports = makeRouter;
