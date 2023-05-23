const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Plan = sequelize.define(
  "Plans",
  {
    PlanId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Plan: {
      type: DataTypes.STRING,
    },
    Duration: {
      type: DataTypes.STRING,
    },
    Price: {
      type: DataTypes.DOUBLE,
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

module.exports = { Plan, sequelize };
