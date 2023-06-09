const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");
const { Car } = require("../models/Car.js");

const Payment = sequelize.define(
  "Payments",
  {
    PaymentId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    TransId: {
      type: DataTypes.STRING,
    },
    Amount: {
      type: DataTypes.DOUBLE,
    },
    PaymentMethod: {
      type: DataTypes.STRING,
    },
    DatePaid: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
    },
    CarId: {
      type: DataTypes.BIGINT,
      foreignKey: {
        column: "CarId",
        referencedTable: "Car",
      },
    },
  },
  {
    timestamps: false,
  }
);

Payment.belongsTo(Car, { foreignKey: "CarId" });
Car.hasMany(Payment, { foreignKey: "CarId" });
module.exports = { Payment, sequelize };
