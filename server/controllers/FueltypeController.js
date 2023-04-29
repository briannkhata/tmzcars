require("../database/database.js");
const { Fueltype } = require("../models/Fueltype.js");

const getAll = async (req, res) => {
  try {
    const fueltypes = await Fueltype.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: fueltypes,
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
    const fueltype = await Fueltype.findByPk(Id);
    if (!fueltype) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: fueltype,
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
    const { Fueltype } = req.body;
    await Fueltype.create({ Fueltype });
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
    const { Fueltype } = req.body;
    const { Id } = req.params;
    const updatefueltype = await Fueltype.update(
      { Fueltype },
      { where: { FueltypeId: Id } }
    );
    if (!updatefueltype) {
      res.status(500).json({
        success: 0,
        message: ` Error updating fueltype : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Fueltype updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating fueltype : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const Deleted = 1;
    const { Id } = req.params;
    const updatefueltype = await Fueltype.update(
      { Deleted },
      { where: { FueltypeId: Id } }
    );
    if (!updatefueltype) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting fueltype : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Fueltype deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting fueltype : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
