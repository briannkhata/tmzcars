const express = require("express");
const makeController = require("../controllers/MakeController");
const makeRouter = express.Router();
makeRouter.get("/", makeController.getAll);
makeRouter.get("/make/:Id", makeController.getSingle);
makeRouter.put("/delete/:Id", makeController.remove);
makeRouter.put("/update/:Id", makeController.update);
makeRouter.post("/add/", makeController.add);

module.exports = makeRouter;
