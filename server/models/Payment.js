const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Payment = sequelize.define("Payments", {
  PaymentId: {
    type: DataTypes.UUID,
    defaultValue: uuidv4(),
    primaryKey: true,
  },
  TransId: {
    type: DataTypes.STRING,
  },
  DatePaid: {
    type: DataTypes.Date,
  },
  Deleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Payment;
