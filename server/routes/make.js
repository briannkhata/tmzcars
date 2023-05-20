const express = require("express");
const makeController = require("../controllers/MakeController");
const makeRouter = express.Router();
makeRouter.get("/", makeController.getAll);
makeRouter.get("/getOne/:Id", makeController.getSingle);
makeRouter.put("/delete/:Id", makeController.remove);
makeRouter.post("/update/", makeController.update);
makeRouter.post("/add/", makeController.add);

module.exports = makeRouter;
