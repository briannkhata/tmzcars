const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Payment = sequelize.define("Payments", {
  PaymentId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  TransId: {
    type: DataTypes.STRING,
  },
  DatePaid: {
    type: DataTypes.DATE,
  },
  Deleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Payment;
