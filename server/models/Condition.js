const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");

const Condition = sequelize.define("Conditions", {
  ConditionId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  Condition: {
    type: DataTypes.STRING,
  },
  Deleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Condition;
