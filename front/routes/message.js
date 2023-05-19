const express = require("express");
const messageRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

messageRouter.get("/", async (req, res) => {
  await axios
    .get(API_URL + "message/")
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/messages", {
        data: data,
        title: "messages",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

messageRouter.get("/edit/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "message/getOne/" + id)
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/addmessage", {
        id: id,
        message: data.message,
        title: "Update Id Type",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

messageRouter.get("/add", (req, res) => {
  const data = {
    title: "Add Id Type",
    id: "",
    message: "",
  };
  res.render("backend/admin/addmessage", data);
});

messageRouter.post("/save", async (req, res) => {
  const id = req.body.id;
  await axios
    .post(API_URL + "message/add/", {
      message: req.body.message,
      messageId: id,
    })
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      if (id) {
        res.redirect("/message/");
      } else {
        res.redirect("/message/add");
      }
    })
    .catch((error) => {
      req.flash("error", "Error saving message" + error);
      res.redirect("/message/add");
    });
});

messageRouter.get("/delete/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .put(API_URL + "message/delete/" + id)
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      res.redirect("/message");
    })
    .catch((error) => {
      req.flash("error", "Error deleting message " + error);
      res.redirect("/message");
    });
});

module.exports = messageRouter;
