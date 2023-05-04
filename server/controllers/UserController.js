require("../database/database.js");
const { User } = require("../models/User.js");
const auth = require("../middleware/auth.js");

const getAll = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "users retrieved successfully",
      data: users,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error getting users : ${err}` });
  }
};

const getSingle = async (req, res) => {
  try {
    const { Id } = req.params;
    const user = await User.findByPk(Id);
    res.status(200).json({
      success: 1,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error getting user : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const Deleted = 1;
    const { Id } = req.params;
    const updateUser = await User.update(
      { Deleted },
      { where: { UserId: Id } }
    );
    if (!updateUser) {
      res
        .status(500)
        .json({ success: 0, message: ` Error deleting user : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "User deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting User : ${err}` });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { Id } = req.params;
    const { Name, Address, Email, AltPhone, Country, City, Region } = req.body;
    await User.update(
      {
        Name,
        Address,
        Email,
        AltPhone,
        Country,
        City,
        Region,
      },
      { where: { UserId: Id } }
    );
    res.status(200).json({
      success: 1,
      message: "profile updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error updating profile : ${err}` });
  }
};

const changePhone = async (req, res) => {
  try {
    const { Id } = req.params;
    const { Phone } = req.body;
    await User.update({ Phone }, { where: { UserId: Id } });
    res.status(200).json({
      success: 1,
      message: "phone changed successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error changing phone : ${err}` });
  }
};

const changeProfile = async (req, res) => {
  try {
    const { Id } = req.params;
    const { Photo } = req.body;
    await User.update({ Photo }, { where: { UserId: Id } });
    res.status(200).json({
      success: 1,
      message: "photo changed successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error changing photo : ${err}` });
  }
};

const changePassword = async (req, res) => {
  try {
    const { Id } = req.params;
    const { Password } = req.body;
    const hashedPassword = await bcrypt.hash(Password, 10);

    await User.update({ Password: hashedPassword }, { where: { UserId: Id } });
    res.status(200).json({
      success: 1,
      message: "password changed successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error changing password : ${err}` });
  }
};

const verifyAccount = async (req, res) => {
  try {
    const { Id } = req.params;
    const { IdNumber, IdTypeId } = req.body;

    await User.update({ IdNumber, IdTypeId }, { where: { UserId: Id } });
    res.status(200).json({
      success: 1,
      message: "account verified successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error verifying account : ${err}` });
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        res
          .status(500)
          .json({ success: 0, message: `Error logging out : ${err}` });
      }
      res.status(200).json({ success: 1, message: `logout successfull` });
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: 0, message: `Error logging out : ${error}` });
  }
};

module.exports = {
  getAll,
  getSingle,
  logout,
  changePassword,
  changePhone,
  changeProfile,
  updateProfile,
  verifyAccount,
  remove,
};
