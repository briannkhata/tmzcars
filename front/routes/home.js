const express = require("express");
const homeRouter = express.Router();
const axios = require("axios");

//const headers = { Authorization: `Bearer ${API_TOKEN}` };
const API_URL = "http://127.0.0.1:7002/api/v1/home/";
//localhost:7002/api/v1/home/register
//const API_TOKEN = "YOUR_API_TOKEN";

homeRouter.get("/", (req, res) => {
  const data = {
    title: "Home",
  };
  res.render("home", data);
});

homeRouter.get("/about", (req, res) => {
  const data = {
    title: "About Us",
  };
  res.render("about", data);
});

homeRouter.get("/contact", (req, res) => {
  const data = {
    title: "Contact Us",
  };
  res.render("contact", data);
});
homeRouter.get("/login", (req, res) => {
  const data = {
    title: "Login",
  };
  res.render("login", data);
});
homeRouter.get("/join", (req, res) => {
  const data = {
    title: "Create Account",
    message: "",
    message2: "",
  };
  res.render("join", data);
});

homeRouter.post("/register", async (req, res) => {
  const data = {
    Name: req.body.Name,
    Phone: req.body.Phone,
    Password: req.body.Password,
  };

  const REG_URL = API_URL + "register/";
  try {
    const response = await axios.post(REG_URL, data);
    const responseDataMessage = response.data.message;
    const responseDataSuccess = response.data.success;

    if (responseDataSuccess == 1) {
      res.render("join", {
        title: "Create Account",
        message: responseDataMessage,
        message2: "",
      });
    }

    if (responseDataSuccess == 0) {
      res.render("join", {
        title: "Create Account",
        message2: responseDataMessage,
        message: "",
      });
    }
  } catch (error) {
    if (error.response) {
      res.render("join", {
        title: "Create Account",
        message2: error.response.data.message,
        message: "",
      });
    } else if (error.request) {
      res.render("join", {
        title: "Create Account",
        message2: "No response received from server",
        message: "",
      });
    } else {
      res.render("join", {
        title: "Create Account",
        message2: "Error making request:",
        message: "",
      });
    }
  }
});

module.exports = homeRouter;
