const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Make = sequelize.define("Makes", {
  MakeId: {
    type: DataTypes.UUID,
    defaultValue: uuidv4(),
    primaryKey: true,
  },
  Make: {
    type: DataTypes.STRING,
  },
  Deleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Make;
