require("../database/database.js");
const { Interior } = require("../models/Interior.js");

const getAll = async (req, res) => {
  try {
    const interiors = await Interior.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: interiors,
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
    const interior = await Interior.findByPk(Id);
    if (!interior) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: interior,
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
    const interior = req.body.Interior;
    await Interior.create({ Interior: interior });
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
    const interior = req.body.Interior;
    const { Id } = req.params;
    const updateinterior = await Interior.update(
      { Interior },
      { where: { InteriorId: Id } }
    );
    if (!updateinterior) {
      res.status(500).json({
        success: 0,
        message: ` Error updating interior : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Interior updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating interior : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const Deleted = 1;
    const { Id } = req.params;
    const updateinterior = await Interior.update(
      { Deleted },
      { where: { InteriorId: Id } }
    );
    if (!updateinterior) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting interior : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Interior deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting Interior : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
