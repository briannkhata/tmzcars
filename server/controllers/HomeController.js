require("../database/database.js");
const { User, IdType, Testimonial } = require("../models/User.js");
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
      message: "account created successfully! You can now log in.",
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: "Error creating account. Please try again later." + err,
    });
  }
};

const login = async (req, res) => {
  const { Phone, Password } = req.body;

  try {
    const user = await User.findOne({
      where: { Phone: Phone },
    });

    if (user && bcrypt.compare(Password, user.Password)) {
      const token = jwt.sign(
        {
          id: user.UserId,
          phone: Phone,
          name: user.Name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.status(200).json({
        success: 1,
        message: `${user.Name} is authenticated`,
        token: token,
      });
      console.log(token);
    } else {
      res.status(500).json({
        success: 0,
        message: "wrong phone or password",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: 0,
      message: "wrong phone number or password",
    });
  }
};

// const login = async (req, res) => {
//   try {
//     const phone = req.body.Phone;
//     const password = req.body.Password;
//     const user = await User.findOne({ where: { Phone: phone } });

//     if (!user) {
//       return res.status(404).json({
//         success: 0,
//         message: "User not found",
//       });
//     } else {
//       const isMatch = await bcrypt.compare(password, user.Password);
//       if (!isMatch) {
//         return res.status(401).json({
//           success: 0,
//           message: "Invalid credentials",
//         });
//       } else {
//         return res.status(200).json({
//           success: 1,
//           message: "user authenticated successfully",
//           //token,
//           user: {
//             id: user.UserId,
//             name: user.Name,
//             email: user.Email,
//           },
//         });
//       }
//     }
//     // const payload = { id: user.id };
//     // const token = jwt.sign(payload, process.env.JWT_SECRET, {
//     //   expiresIn: process.env.JWT_EXPIRE,
//     // });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: 0,
//       message: "server error",
//     });
//   }
// };

module.exports = {
  register,
  login,
};
