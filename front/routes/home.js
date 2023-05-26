const express = require("express");
const homeRouter = express.Router();
const axios = require("axios");
const { Photo } = require("../../server/models/Photo");
const jwt = require("jsonwebtoken");

//const headers = { Authorization: `Bearer ${API_TOKEN}` };
const API_URL = "http://127.0.0.1:7002/api/v1/";
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

homeRouter.get("/career", (req, res) => {
  const data = {
    title: "Careers",
    message: "",
    message2: "",
  };
  res.render("join", data);
});

homeRouter.post("/register", async (req, res) => {
  try {
    const response = await axios.post(API_URL + "home/register/", {
      Name: req.body.Name,
      Phone: req.body.Phone,
      Password: req.body.Password,
    });
    const { success, message } = response.data;

    if (success === 1) {
      req.flash("success", message);
      return res.redirect("/join");
    }
    if (success === 0) {
      req.flash("error", message);
      return res.redirect("/join");
    }
  } catch (error) {
    req.flash("error", error.toString());
    return res.redirect("/join");
  }
});

function getUsers() {
  return axios
    .get(API_URL + "user/")
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getCars() {
  return axios
    .get(API_URL + "car/")
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getConfirmed() {
  return axios
    .get(API_URL + "user/getConfirmed/")
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getCarsToday() {
  return axios
    .get(API_URL + "car/getCarsToday/")
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getCarsFeatured() {
  return axios
    .get(API_URL + "feature/")
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

homeRouter.get("/dashboard", async (req, res) => {
  const users = await getUsers();
  const cars = await getCars();
  const confirmed = await getConfirmed();
  const carstoday = await getCarsToday();
  const carsFeatured = await getCarsFeatured();
  const data = {
    title: "Dashboard",
    users: users,
    confirmed: confirmed,
    cars: cars,
    carstoday: carstoday,
    carsFeatured: carsFeatured,
  };
  res.render("backend/admin/dashboard", data);
});

homeRouter.post("/login", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}home/login/`, {
      Phone: req.body.Phone,
      Password: req.body.Password,
    });

    const { success, message, token } = response.data;
    if (success === 1) {
      console.log(token.name);
      return res.redirect("/dashboard");
    }
    if (success === 0) {
      req.flash("error", message);
      return res.redirect("/login");
    }
  } catch (error) {
    req.flash("error", error.toString());
    res.redirect("/login");
  }
});

homeRouter.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

homeRouter.post("/sendmessage", async (req, res) => {
  try {
    const response = await axios.post(API_URL + "message/add/", {
      Name: req.body.Name,
      Phone: req.body.Phone,
      Email: req.body.Email,
      Message: req.body.Message,
    });

    const { success, message } = response.data;
    if (success === 1) {
      req.flash("success", message);
      return res.redirect("/contact");
    }
    if (success === 0) {
      req.flash("error", message);
      return res.redirect("/contact");
    }
  } catch (error) {
    req.flash("error", error.toString());
    return res.redirect("/contact");
  }
});

module.exports = homeRouter;
