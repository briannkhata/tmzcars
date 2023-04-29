require("../database/database.js");
const { Setting } = require("../models/Setting.js");

const getAll = async (req, res) => {
  try {
    const settings = await Setting.findAll();
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: settings,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error getting data : ${err}` });
  }
};

const getSingle = async (req, res) => {
  try {
    const { Id } = req.params;
    const setting = await Setting.findByPk(Id);
    if (!setting) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: setting,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: `Error getting data : ${err}`,
    });
  }
};

const add = async (req, res) => {
  try {
    const { Phone, Email, Address, App } = req.body;
    await Setting.create({
      Phone,
      Email,
      Address,
      App,
    });
    res.status(200).json({
      success: 1,
      message: "Data Created",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error creating data : ${err}` });
  }
};

const update = async (req, res) => {
  try {
    const { Phone, Email, Address, App } = req.body;
    const { Id } = req.params;
    const updateSetting = await Setting.update(
      { Phone, Email, Address, App },
      { where: { SettingId: Id } }
    );
    if (!updateSetting) {
      res.status(500).json({
        success: 0,
        message: ` Error updating Setting : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Setting updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating Setting : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const Deleted = 1;
    const { Id } = req.params;
    const updateSetting = await Setting.update(
      { Deleted },
      { where: { SettingId: Id } }
    );
    if (!updateSetting) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting Setting : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Setting deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting Setting : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
