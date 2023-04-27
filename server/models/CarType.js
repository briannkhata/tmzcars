const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const CarType = sequelize.define("CarTypes", {
  CarTypeId: {
    type: DataTypes.UUID,
    defaultValue: uuidv4(),
    primaryKey: true,
  },
  CarType: {
    type: DataTypes.STRING,
  },
  Deleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = CarType;
