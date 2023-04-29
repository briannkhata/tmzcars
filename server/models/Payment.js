const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Payment = sequelize.define(
  "Payments",
  {
    PaymentId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    TransId: {
      type: DataTypes.STRING,
    },
    Amount: {
      type: DataTypes.DOUBLE,
    },
    DatePaid: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
    },
    Deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Payment;
