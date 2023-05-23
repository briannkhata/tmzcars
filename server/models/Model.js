const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Model = sequelize.define(
  "Models",
  {
    ModelId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Model: {
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

module.exports = { Model, sequelize };
