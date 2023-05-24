const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");

const Feature = sequelize.define(
  "Features",
  {
    FeatureId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
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

module.exports = { Feature, sequelize };
