const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");


const Transmission = sequelize.define("Transmissions", {
  TransmissionId: {
    type: DataTypes.UUID,
    defaultValue: uuidv4(),
    primaryKey: true,
  },
  Transmission: {
    type: DataTypes.STRING,
  },
  Deleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Transmission;
