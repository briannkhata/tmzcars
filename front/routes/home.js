const express = require("express");
const homeRouter = express.Router();
const axios = require("axios");
const { Photo } = require("../../server/models/Photo");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/CheckAuth.js");

//const headers = { Authorization: `Bearer ${API_TOKEN}` };
const API_URL = "http://127.0.0.1:7002/api/v1/";
//const API_TOKEN = "YOUR_API_TOKEN";

// homeRouter.use("/dashboard", function (err, req, res, next) {
//   console.log(err);
//   res.redirect("/login");
// });

function getAllCars() {
  return axios
    .get(API_URL + "car/")
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getModels() {
  return axios
    .get(API_URL + "model/")
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getMakes() {
  return axios
    .get(API_URL + "make/")
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getCarTypes() {
  return axios
    .get(API_URL + "cartype/")
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getConditions() {
  return axios
    .get(API_URL + "condition/")
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getCarDetails(id) {
  return axios
    .get(API_URL + "car/getOne/" + id)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getCarImages(id) {
  return axios
    .get(API_URL + "photo/getCarImages/" + id)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

homeRouter.get("/", async (req, res) => {
  const cars = await getAllCars();
  const models = await getModels();
  const makes = await getMakes();
  const conditions = await getConditions();
  const cartypes = await getCarTypes();
  console.log(cars);
  const data = {
    title: "Home",
    cars: cars,
    models: models,
    makes: makes,
    conditions: conditions,
    cartypes: cartypes,
  };
  res.render("home", data);
});

homeRouter.get("/view/(:id)", async (req, res) => {
  const car = await getCarDetails(req.params.id);
  const images = await getCarImages(req.params.id);
  console.log(car);
  const data = {
    title: "Car Details",
    id: car.CarId,
    Year: car.Year,
    SellingPrice: car.SellingPrice,
    TmzSellingPrice: car.TmzSellingPrice,
    Mileage: car.Mileage,
    Engine: car.Engine,
    FuelConsumption: car.FuelConsumption,
    Warrant: car.Warrant,
    CountryOfManufacture: car.CountryOfManufacture,
    ServiceHistory: car.ServiceHistory,
    RegNo: car.RegNo,
    Model: car.Model.Model,
    Make: car.Make.Make,
    Transmission: car.Transmission.Transmission,
    Steering: car.Steering,
    Condition: car.Condition.Condition,
    InteriorColor: car.InteriorColor,
    ExteriorColor: car.ExteriorColor,
    FuelType: car.FuelType.FuelType,
    CarType: car.CarType.CarType,
    Body: car.Body.Body,
    YearBought: car.YearBought,
    YearsUsed: car.YearsUsed,
    OtherDetails: car.OtherDetails,
    Name: car.User.Name,
    Phone: car.User.Phone,
    Email: car.User.Email,
    images: images,
    title: "Car Details",
  };
  res.render("cardetails", data);
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

homeRouter.post("/login", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}home/login/`, {
      Phone: req.body.Phone,
      Password: req.body.Password,
    });

    const { success, message, token } = response.data;
    if (success === 1) {
      req.session.user = response.data.data;
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

function checkSignIn(req, res, next) {
  if (req.session.user.Role) {
    next();
  } else {
    //next(new Error("Session Expired or You need to Login!"));
    res.redirect("/login");
  }
}

homeRouter.get("/dashboard", checkAuth, async (req, res) => {
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
    name: req.session.user.Name,
    id: req.session.user.UserId,
    role: req.session.user.Role,
  };
  res.render(
    "backend/" + req.session.user.Role.toLowerCase() + "/dashboard",
    data
  );
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
