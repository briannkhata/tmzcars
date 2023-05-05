const express = require("express");
const homeRouter = express.Router();
const axios = require("axios");
const { Photo } = require("../../server/models/Photo");

//const headers = { Authorization: `Bearer ${API_TOKEN}` };
const API_URL = "http://127.0.0.1:7002/api/v1/";
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
    email: "info@tmzcars.com",
    phone: "0888 015 904",
    address: "Next to MASM House, Blantyre",
    message: "",
    message2: "",
  };
  res.render("contact", data);
});
homeRouter.get("/login", (req, res) => {
  const data = {
    title: "Login",
    message: "",
    message2: "",
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

  const REG_URL = API_URL + "home/register/";
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

homeRouter.get("/dashboard", (req, res) => {
  const data = {
    title: "Dashboard",
  };
  res.render("backend/admin/dashboard", data);
});

homeRouter.post("/login", async (req, res) => {
  const data = {
    Phone: req.body.Phone,
    Password: req.body.Password,
  };

  const REG_URL = API_URL + "home/login/";
  try {
    const response = await axios.post(REG_URL, data);
    const responseDataMessage = response.data.message;
    const responseDataSuccess = response.data.success;

    if (responseDataSuccess == 1) {
      res.redirect("dashboard");
    }
    if (responseDataSuccess == 0) {
      res.render("login", {
        title: "Login",
        message: responseDataMessage,
        message2: "",
      });
    }
  } catch (error) {
    if (error.response) {
      res.render("login", {
        title: "Create Account",
        message2: error.response.data.message,
        message: "",
      });
    } else if (error.request) {
      res.render("login", {
        title: "Login",
        message2: "No response received from server",
        message: "",
      });
    } else {
      res.render("login", {
        title: "Login",
        message2: "Error making request:",
        message: "",
      });
    }
  }
});

homeRouter.post("/sendmessage", async (req, res) => {
  const data = {
    Name: req.body.Name,
    Phone: req.body.Phone,
    Email: req.body.Email,
    Message: req.body.Message,
  };

  const SENDMESSAGE_URL = API_URL + "message/add/";
  try {
    const response = await axios.post(SENDMESSAGE_URL, data);
    const responseDataMessage = response.data.message;
    const responseDataSuccess = response.data.success;

    if (responseDataSuccess == 1) {
      res.render("contact", {
        title: "Contact Us",
        message: responseDataMessage,
        message2: "",
        email: "info@tmzcars.com",
        phone: "0888 015 904",
        address: "Next to MASM House, Blantyre",
      });
    }

    if (responseDataSuccess == 0) {
      res.render("contact", {
        title: "Contact Us",
        message2: responseDataMessage,
        message: "",
        email: "info@tmzcars.com",
        phone: "0888 015 904",
        address: "Next to MASM House, Blantyre",
      });
    }
  } catch (error) {
    if (error.response) {
      res.render("contact", {
        title: "Contact Us",
        message2: error.response.data.message,
        message: "",
        email: "info@tmzcars.com",
        phone: "0888 015 904",
        address: "Next to MASM House, Blantyre",
      });
    } else if (error.request) {
      res.render("contact", {
        title: "Contact Us",
        message2: "No response received from server",
        message: "",
        email: "info@tmzcars.com",
        phone: "0888 015 904",
        address: "Next to MASM House, Blantyre",
      });
    } else {
      res.render("contact", {
        title: "Contact Us",
        message2: "Error making request:",
        message: "",
        email: "info@tmzcars.com",
        phone: "0888 015 904",
        address: "Next to MASM House, Blantyre",
      });
    }
  }
});

module.exports = homeRouter;
