const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const FuelType = sequelize.define(
  "FuelTypes",
  {
    FuelTypeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    FuelType: {
      type: DataTypes.STRING,
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

module.exports = FuelType;
