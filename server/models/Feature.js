const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");
const { Car } = require("../models/Car.js");

const Feature = sequelize.define(
  "Features",
  {
    FeatureId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    StartDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    EndDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    DateAdded: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Date.now,
    },
    Deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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

Feature.belongsTo(Car, { foreignKey: "CarId" });
Car.hasMany(Feature, { foreignKey: "CarId" });
module.exports = { Feature, sequelize };
