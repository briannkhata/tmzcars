require("../database/database.js");
const { Transmission } = require("../models/Transmission.js");

const getAll = async (req, res) => {
  try {
    const Transmissions = await Transmission.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: Transmissions,
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
    const transmission = await Transmission.findByPk(Id);
    if (!transmission) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: transmission,
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
    const transmission = req.body.Transmission;
    await Transmission.create({ Transmission: transmission });
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
    const transmission = req.body.Transmission;
    const { Id } = req.params;
    const updateTransmission = await Transmission.update(
      { Transmission: transmission },
      { where: { TransmissionId: Id } }
    );
    if (!updateTransmission) {
      res.status(500).json({
        success: 0,
        message: ` Error updating Transmission : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Transmission updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating Transmission : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const { Id } = req.params;
    const updateTransmission = await Transmission.update(
      { Deleted: 1 },
      { where: { TransmissionId: Id } }
    );
    if (!updateTransmission) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting Transmission : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Transmission deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting Transmission : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
