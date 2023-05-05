const express = require("express");
const userRouter = express.Router();
const axios = require("axios");

userRouter.get("/addcar", (req, res) => {
  const data = {
    title: "Add Car",
  };
  res.render("backend/admin/addcar", data);
});

module.exports = userRouter;
