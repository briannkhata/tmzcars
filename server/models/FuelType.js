const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const FuelType = sequelize.define(
  "FuelTypes",
  {
    FuelTypeId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
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

FuelType.associate = (models) => {
  FuelType.hasMany(models.Car);
};

module.exports = { FuelType, sequelize };
