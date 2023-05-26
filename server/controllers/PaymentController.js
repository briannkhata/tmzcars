require("../database/database.js");
const { Payment } = require("../models/Payment.js");
const { Car } = require("../models/Car.js");

const getAll = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [
        {
          model: Car,
        },
      ],
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

const add = async (req, res) => {
  try {
    const { TransId, Amount, PaymentMethod, CarId } = req.body;
    await Payment.create({
      TransId,
      Amount,
      PaymentMethod,
      CarId,
    });
    res.status(200).json({
      success: 1,
      message: "adding payment successfull",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error adding payement : ${err}` });
  }
};

module.exports = {
  add,
  getAll,
};
