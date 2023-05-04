const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");

const Feature = sequelize.define(
  "Features",
  {
    FeatureId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    DateAdded: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Date.now,
    },
    TransId: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    AddBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Feature, sequelize };
