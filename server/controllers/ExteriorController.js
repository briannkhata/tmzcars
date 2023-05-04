require("../database/database.js");
const { Exterior } = require("../models/Exterior.js");

const getAll = async (req, res) => {
  try {
    const exteriors = await Exterior.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: exteriors,
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
    const exterior = await Exterior.findByPk(Id);
    if (!exterior) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: exterior,
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
    const exterior = req.body.Exterior;
    await Exterior.create({ Exterior: exterior });
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
    const exterior = req.body.Exterior;
    const { Id } = req.params;
    const updateexterior = await Exterior.update(
      { Exterior: exterior },
      { where: { exteriorId: Id } }
    );
    if (!updateexterior) {
      res.status(500).json({
        success: 0,
        message: ` Error updating exterior : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "exterior updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating exterior : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const { Id } = req.params;
    const updateexterior = await Exterior.update(
      { Deleted: 1 },
      { where: { ExteriorId: Id } }
    );
    if (!updateexterior) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting exterior : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "exterior deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting exterior : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
