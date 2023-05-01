require("../database/database.js");
const { User } = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("../middleware/auth.js");

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
    const checkPhone = await User.findOne({
      where: { Phone: Phone },
    });

    if (!checkPhone) {
      res.status(500).json({
        success: 0,
        message: "wrong phone number",
      });
    }

    if (checkPhone) {
      if (await bcrypt.compare(Password, checkPhone.Password)) {
        //TOKENS

        const accessToken = jwt.sign(
          { id: checkPhone.UserId },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30s",
          }
        );

        res.send({
          success: 1,
          token: accessToken,
        });

        const refreshToken = jwt.sign(
          { Phone: checkPhone.Phone },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "1day",
          }
        );

        // res.send({
        //   success: 1,
        //   token: accessToken,
        // });

        res.status(200).json({
          success: 1,
          message: `${checkPhone.Name} is authenticated`,
          token: accessToken,
        });
      } else {
        res.status(500).json({
          success: 0,
          message: "wrong password",
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: 0,
      message: "wrong phone number",
    });
  }
};

module.exports = {
  register,
  login,
};
