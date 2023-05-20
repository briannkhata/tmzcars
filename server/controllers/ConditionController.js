require("../database/database.js");
const { Condition } = require("../models/condition.js");

const getAll = async (req, res) => {
  try {
    const conditions = await Condition.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: conditions,
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
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: condition,
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
    await Condition.create({ Condition: req.body.Condition })
      .then((response) => {
        res.status(200).json({
          success: 1,
          message: "Car Type created Succesfull",
          data: response,
        });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ success: 0, message: ` error Adding condition : ${err}` });
      })
      .finally(() => {});
  } catch {}
};

const update = async (req, res) => {
  try {
    const updatecondition = await Condition.update(
      { Condition: req.body.Condition },
      { where: { ConditionId: req.body.ConditionId } }
    );
    if (!updatecondition) {
      res.status(500).json({
        success: 0,
        message: ` Error Updating condition : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "condition Updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating condition : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const { Id } = req.params;
    const updatecondition = await Condition.update(
      { Deleted: 1 },
      { where: { conditionId: Id } }
    );
    if (!updatecondition) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting condition : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "condition deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting condition : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
