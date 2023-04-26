const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});

const IdType = sequelize.define("IdTypes", {
  IdTypeId: {
    type: DataTypes.UUID,
    defaultValue: uuidv4(),
    primaryKey: true,
  },
  IdType: {
    type: DataTypes.STRING,
  },
  Deleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = IdType;
