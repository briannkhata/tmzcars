require("../database/database.js");
const { Plan } = require("../models/Plan.js");

const getAll = async (req, res) => {
  try {
    const plans = await Plan.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: plans,
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
    const plan = await Plan.findByPk(Id);
    if (!plan) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: plan,
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
    const { Plan, Duration, Price } = req.body;
    await Plan.create({ Plan, Duration, Price });
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
    const { Plan, Duration, Price } = req.body;
    const { Id } = req.params;
    const updatePlan = await Plan.update(
      { Plan, Duration, Price },
      { where: { PlanId: Id } }
    );
    if (!updatePlan) {
      res.status(500).json({
        success: 0,
        message: ` Error updating Plan : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Plan updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating Plan : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const Deleted = 1;
    const { Id } = req.params;
    const updatePlan = await Plan.update(
      { Deleted },
      { where: { PlanId: Id } }
    );
    if (!updatePlan) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting Plan : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Plan deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting Plan : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
