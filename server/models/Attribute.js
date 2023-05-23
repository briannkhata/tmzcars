const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Attribute = sequelize.define(
  "Attributes",
  {
    AttributeId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Attribute: {
      type: DataTypes.STRING,
    },

    AttributeValue: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Attribute, sequelize };
