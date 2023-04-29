require("../database/database.js");
const { User } = require("../models/User.js");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  console.log("register route");

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
        message: "phone already exists",
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
      message: "account created successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error creating account : ${err}` });
  }
};

const login = async (req, res) => {
  const { Phone, Password } = req.body;

  try {
    const checkUser = await User.findOne({
      where: { Phone: Phone },
    });

    // if (!checkUser) {
    //   return res.render("login", {
    //     message: "Phone not found",
    //   });
    // }
  } catch (error) {
    console.error(error);
    // return res.render("login", {
    //   message: "An error occurred while logging in",
    // });
  }
};

module.exports = {
  register,
  login,
};
