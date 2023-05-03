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
    const plan = req.body.Plan;
    const duration = req.body.Duration;
    const price = req.body.Price;

    await Plan.create({ Plan: plan, Duration: duration, Price: price });
    res.status(200).json({
      success: 1,
      message: "Plan Created",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error creating data : ${err}` });
  }
};

const update = async (req, res) => {
  try {
    const plan = req.body.Plan;
    const duration = req.body.Duration;
    const price = req.body.Price;
    const { Id } = req.params;
    const updatePlan = await Plan.update(
      { Plan: plan, Duration: duration, Price: price },
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
    const { Id } = req.params;
    const updateResult = await Plan.update(
      { Deleted: 1 },
      { where: { PlanId: Id } }
    );

    if (updateResult[0] === 0) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Plan deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the plan",
    });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
