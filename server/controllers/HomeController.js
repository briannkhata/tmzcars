require("../database/database.js");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

const home = (req, res) => {
  res.render("home", { pageTitle: "Home" });
};
const about = (req, res) => {
  res.render("about", { pageTitle: "About Us" });
};
const contact = (req, res) => {
  res.render("contact", { pageTitle: "Contact Us" });
};
const join = (req, res) => {
  res.render("join", { pageTitle: "Create Account" });
};
const login = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};

const register = async (req, res) => {
  try {
    const { Name, Phone, Password } = req.body;
    const Role = "User";
    const hashedPassword = await bcrypt.hash(Password, 10);

    const alreadyExists = await User.findOne({ where: { Phone } }).catch(
      (err) => {
        console.log("Error :", err);
      }
    );

    if (alreadyExists) {
      return res.status(500).json({
        success: 0,
        message: "PHONE NUMBER ALEADY EXISTS..!",
      });
    }

    await User.create({
      Name: Name,
      Phone: Phone,
      Password: hashedPassword,
      Role: Role,
    });
    res.status(200).json({
      success: 1,
      message:
        "ACCOUNT CREATED successfully..! Please LOGIN and UPDATE YOUR profile",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error CREATING ACCOUNT : ${err}` });
  }
};

const signin = async (req, res) => {
  const { Phone, Password } = req.body;

  try {
    const checkUser = await User.findOne({
      where: { Phone: Phone },
    });

    if (!checkUser) {
      return res.render("login", {
        message: "Phone not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.render("login", {
      message: "An error occurred while logging in",
    });
  }
};

module.exports = {
  home,
  about,
  contact,
  join,
  login,
  register,
  signin,
};
