const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Exterior = sequelize.define(
  "Exteriors",
  {
    ExteriorId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Exterior: {
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

module.exports = { Exterior, sequelize };
