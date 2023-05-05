require("../database/database.js");
const { User } = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("../middleware/auth.js");
const register = async (req, res) => {
  try {
    const { Name, Phone, Password } = req.body;

    if (!Name || !Phone || !Password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const user = await User.findOne({ where: { Phone } });

    if (user) {
      return res.status(409).json({
        success: false,
        message: "Phone number already exists.",
      });
    }

    await User.create({
      Name,
      Phone,
      Password: hashedPassword,
      Role: "User",
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully! You can now log in.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating account. Please try again later." + err,
    });
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

        // const accessToken = jwt.sign(
        //   //{ id: checkPhone.UserId },
        //   { checkPhone },
        //   process.env.ACCESS_TOKEN_SECRET,
        //   {
        //     expiresIn: "1day",
        //   }
        // );

        // res.send({
        //   success: 1,
        //   user: checkPhone,
        //   token: accessToken,
        // });

        //res.json({ checkPhone, token: accessToken });

        // const refreshToken = jwt.sign(
        //   { Phone: checkPhone.Phone },
        //   process.env.REFRESH_TOKEN_SECRET,
        //   {
        //     expiresIn: "1day",
        //   }
        // );

        // res.send({
        //   success: 1,
        //   token: accessToken,
        // });

        res.status(200).json({
          success: 1,
          message: `${checkPhone.Name} is authenticated`,
          //token: accessToken,
          phone: Phone,
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
