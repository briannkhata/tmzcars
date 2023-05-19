require("../database/database.js");
const { Setting } = require("../models/Setting.js");

const getAll = async (req, res) => {
  try {
    const settings = await Setting.findAll();

    if (!settings || settings.length === 0) {
      return res.status(404).json({ success: 0, message: "No settings found" });
    }

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

const add = async (req, res) => {
  try {
    const { Id, Phone, Email, Address, App } = req.body;

    if (!Id) {
      await Setting.create({
        App: App,
        Phone: Phone,
        Email: Email,
        Address: Address,
      });
    } else {
      await Setting.update(
        { App: App, Phone: Phone, Email: Email, Address: Address },
        { where: { Id: Id } }
      );
    }

    res.status(200).json({
      success: 1,
      message: "data saved successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error saving data : ${err}` });
  }
};

module.exports = {
  add,
  getAll,
};
