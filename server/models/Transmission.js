const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Transmission = sequelize.define(
  "Transmissions",
  {
    TransmissionId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Transmission: {
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

module.exports = { Transmission, sequelize };
