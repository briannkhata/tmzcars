require("../database/database.js");
const { Steering } = require("../models/Steering.js");

const getAll = async (req, res) => {
  try {
    const steerings = await Steering.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: steerings,
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
    const steering = await Steering.findByPk(Id);
    if (!steering) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: steering,
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
    const { Steering } = req.body;
    await steering.create({ Steering });
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
    const { Steering } = req.body;
    const { Id } = req.params;
    const updatesteering = await Steering.update(
      { Steering },
      { where: { SteeringId: Id } }
    );
    if (!updatesteering) {
      res.status(500).json({
        success: 0,
        message: ` Error updating steering : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "steering updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating steering : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const Deleted = 1;
    const { Id } = req.params;
    const updatesteering = await Steering.update(
      { Deleted },
      { where: { SteeringId: Id } }
    );
    if (!updatesteering) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting steering : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "steering deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting steering : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
