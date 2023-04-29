require("../database/database.js");
const { Payment } = require("../models/Payment.js");

const getAll = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: payments,
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
    const payment = await Payment.findByPk(Id);
    if (!payment) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: payment,
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
    const { TransId, Amount } = req.body;
    await Payment.create({
      TransId,
      Amount,
    });
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
    const { TransId, Amount } = req.body;
    const { Id } = req.params;
    const updatePayment = await Payment.update(
      { TransId, Amount },
      { where: { PaymentId: Id } }
    );
    if (!updatePayment) {
      res.status(500).json({
        success: 0,
        message: ` Error updating Payment : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Payment updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating Payment : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const Deleted = 1;
    const { Id } = req.params;
    const updatePayment = await Payment.update(
      { Deleted },
      { where: { PaymentId: Id } }
    );
    if (!updatePayment) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting Payment : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Payment deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting Payment : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
