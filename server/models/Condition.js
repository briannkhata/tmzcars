const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");

const Condition = sequelize.define(
  "Conditions",
  {
    ConditionId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Condition: {
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

module.exports = { Condition, sequelize };
