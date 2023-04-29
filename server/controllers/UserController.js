require("../database/database.js");
const User = require("../models/User.js");

const updateProfile = async (req, res) => {
  try {
    const UserId = req.params.UserId;
    const { Name, Phone, Password } = req.body;

    await User.findById({
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
