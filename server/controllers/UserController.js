require("../database/database.js");
const { User } = require("../models/User.js");
const { IdType } = require("../models/IdType.js");

const auth = require("../middleware/auth.js");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

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

const addadmin = async (req, res) => {
  try {
    const { Name, Phone, Email, Password } = req.body;

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
      Email,
      Password: hashedPassword,
      Role: "Admin",
    });

    res.status(201).json({
      success: 1,
      message: "Account created successfully!.",
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: "Error creating account." + err,
    });
  }
};

const updateadmin = async (req, res) => {
  try {
    const { Name, Phone, Email } = req.body;
    const Password = req.body.Password;
    if (Password != "") {
      const hashedPassword = await bcrypt.hash(Password, 10);
      var updatee = await User.update(
        { Name, Phone, Email, Password: hashedPassword },
        { where: { UserId: req.body.UserId } }
      );
    } else {
      var updatee = await User.update(
        { Name, Phone, Email },
        { where: { UserId: req.body.UserId } }
      );
    }

    if (!updatee) {
      res.status(500).json({
        success: 0,
        message: ` Error updating admin : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "admin Updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating admin : ${err}` });
  }
};

const getAdmins = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        Deleted: 0,
        Role: "Admin",
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

const getSellers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        Deleted: 0,
        Role: "User",
      },
      include: [
        {
          model: IdType,
        },
      ],
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

const getRentals = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        Deleted: 0,
        Role: "Rental",
      },
      include: [
        {
          model: IdType,
        },
      ],
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

const getConfirmed = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        Deleted: 0,
        IdNumber: {
          [Op.not]: null,
        },
      },
      include: [
        {
          model: IdType,
        },
      ],
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
    const user = await User.findByPk(Id, {
      include: [
        {
          model: IdType,
        },
      ],
    });
    res.status(200).json({
      success: 1,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: 0, message: `Error getting user: ${error}` });
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

const updateprofile = async (req, res) => {
  try {
    const id = req.body.UserId;
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
      { where: { UserId: id } }
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

const updatephone = async (req, res) => {
  try {
    const id = req.body.UserId;
    const user = await User.findOne({ where: { Phone: req.body.Phone } });
    if (user) {
      return res.status(500).json({
        success: 0,
        message: "Phone number already exists.",
      });
    } else {
      await User.update({ Phone: req.body.Phone }, { where: { UserId: id } });
      res.status(200).json({
        success: 1,
        message: "phone changed successfully",
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error changing phone : ${err}` });
  }
};

const updatepassword = async (req, res) => {
  try {
    const id = req.body.UserId;
    const { Password } = req.body;
    const hashedPassword = await bcrypt.hash(Password, 10);

    await User.update({ Password: hashedPassword }, { where: { UserId: id } });
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

const verifyaccount = async (req, res) => {
  try {
    const id = req.body.UserId;
    const { IdNumber } = req.body;
    const idtype = req.body.IdTypeId;

    await User.update(
      {
        IdNumber,
        IdTypeId: idtype,
        DateVerified: Date.now(),
        foreignKeys: {
          IdTypeId: {
            table: "IdTypes",
            column: "IdTypeId",
          },
        },
      },
      { where: { UserId: id } }
    );

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
  updatepassword,
  updatephone,
  updateprofile,
  verifyaccount,
  remove,
  getConfirmed,
  getAdmins,
  getSellers,
  getRentals,
  addadmin,
  updateadmin,
};
