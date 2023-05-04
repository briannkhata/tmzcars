const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Steering = sequelize.define(
  "Steerings",
  {
    SteeringId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Steering: {
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

module.exports = { Steering, sequelize };
