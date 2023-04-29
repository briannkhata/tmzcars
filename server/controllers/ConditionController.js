require("../database/database.js");
const { Condition } = require("../models/Condition.js");

const getAll = async (req, res) => {
  try {
    const condition = await Condition.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: condition,
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
    const condition = await Condition.findByPk(Id);
    if (!condition) {
      res
        .status(500)
        .json({ success: 0, message: ` Condition Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting car Condition succesfull",
      data: condition,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: `Error getting Condition Not found : ${err}`,
    });
  }
};

const add = async (req, res) => {
  try {
    const { Condition } = req.body;
    await Condition.create({ Condition });
    res.status(200).json({
      success: 1,
      message: "Car Condition Created",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error creating car Condition : ${err}` });
  }
};

const update = async (req, res) => {
  try {
    const { Condition } = req.body;
    const { Id } = req.params;
    const updateCondition = await Condition.update(
      { Condition },
      { where: { ConditionId: Id } }
    );
    if (!updateCondition) {
      res.status(500).json({
        success: 0,
        message: ` Error updating car Condition : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Car Condition updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating car Condition : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const Deleted = 1;
    const { Id } = req.params;
    const updateCondition = await Condition.update(
      { Deleted },
      { where: { ConditionId: Id } }
    );
    if (!updateCondition) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting car Condition : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Car Condition deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting car Condition : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
