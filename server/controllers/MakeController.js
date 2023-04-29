require("../database/database.js");
const { Make } = require("../models/Make.js");

const getAll = async (req, res) => {
  try {
    const makes = await Make.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: makes,
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
    const make = await Make.findByPk(Id);
    if (!make) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: make,
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
    const { Make } = req.body;
    await Make.create({ Make });
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
    const { Make } = req.body;
    const { Id } = req.params;
    const updatemake = await Make.update({ Make }, { where: { MakeId: Id } });
    if (!updatemake) {
      res.status(500).json({
        success: 0,
        message: ` Error updating make : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "make updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating make : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const Deleted = 1;
    const { Id } = req.params;
    const updatemake = await Make.update(
      { Deleted },
      { where: { MakeId: Id } }
    );
    if (!updatemake) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting make : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "make deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting make : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
