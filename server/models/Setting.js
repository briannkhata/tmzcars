const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});

const Setting = sequelize.define("Settings", {
  Id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4(),
    primaryKey: true,
  },
  Phone: {
    type: DataTypes.STRING,
  },
  Email: {
    type: DataTypes.STRING,
  },

  Address: {
    type: DataTypes.STRING,
  },

  App: {
    type: DataTypes.STRING,
  },
});

module.exports = Setting;
