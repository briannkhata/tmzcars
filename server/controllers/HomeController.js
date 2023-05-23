require("../database/database.js");
const { User } = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("../middleware/auth.js");
const register = async (req, res) => {
  try {
    const { Name, Phone, Password } = req.body;

    // if (!Name || !Phone || !Password) {
    //   return res.status(400).json({
    //     success: 0,
    //     message: "All fields are required.",
    //   });
    // }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const user = await User.findOne({ where: { Phone } });

    if (user) {
      return res.status(500).json({
        success: 0,
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
      success: 1,
      message: "Account created successfully! You can now log in.",
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: "Error creating account. Please try again later." + err,
    });
  }
};

// const login = async (req, res) => {
//   const { Phone, Password } = req.body;

//   try {
//     const checkPhone = await User.findOne({
//       where: { Phone: Phone },
//     });

//     if (!checkPhone) {
//       res.status(500).json({
//         success: 0,
//         message: "wrong phone number",
//       });
//       return;
//     }

//     if (checkPhone) {
//       if (await bcrypt.compare(Password, checkPhone.Password)) {
//         //TOKENS

//         // const accessToken = jwt.sign(
//         //   //{ id: checkPhone.UserId },
//         //   { checkPhone },
//         //   process.env.ACCESS_TOKEN_SECRET,
//         //   {
//         //     expiresIn: "1day",
//         //   }
//         // );

//         // res.send({
//         //   success: 1,
//         //   user: checkPhone,
//         //   token: accessToken,
//         // });

//         //res.json({ checkPhone, token: accessToken });

//         // const refreshToken = jwt.sign(
//         //   { Phone: checkPhone.Phone },
//         //   process.env.REFRESH_TOKEN_SECRET,
//         //   {
//         //     expiresIn: "1day",
//         //   }
//         // );

//         // res.send({
//         //   success: 1,
//         //   token: accessToken,
//         // });

//         res.status(200).json({
//           success: 1,
//           message: `${checkPhone.Name} is authenticated`,
//           //token: accessToken,
//           phone: Phone,
//         });
//       } else {
//         res.status(500).json({
//           success: 0,
//           message: "wrong password",
//         });
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: 0,
//       message: "wrong phone number",
//     });
//   }
// };

const login = async (req, res) => {
  try {
    const phone = req.body.Phone;
    const password = req.body.Password;
    const user = await User.findOne({ where: { Phone: phone } });

    if (!user) {
      return res.status(404).json({
        success: 0,
        message: "User not found",
      });
    } else {
      const isMatch = await bcrypt.compare(password, user.Password);
      if (!isMatch) {
        return res.status(401).json({
          success: 0,
          message: "Invalid credentials",
        });
      } else {
        return res.status(200).json({
          success: 1,
          message: "User authenticated successfully",
          //token,
          user: {
            id: user.UserId,
            name: user.Name,
            email: user.Email,
          },
        });
      }
    }

    // const payload = { id: user.id };
    //  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    //   expiresIn: process.env.JWT_EXPIRE,
    // });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: 0,
      message: "Server error",
    });
  }
};

module.exports = {
  register,
  login,
};
