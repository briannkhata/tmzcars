const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Attribute = sequelize.define(
  "Attributes",
  {
    AttributeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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

module.exports = Attribute;
