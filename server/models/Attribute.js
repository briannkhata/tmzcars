const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});

const Attribute = sequelize.define("Attributes", {
  AttributeId: {
    type: DataTypes.UUID,
    defaultValue: uuidv4(),
    primaryKey: true,
  },
  Attribute: {
    type: DataTypes.STRING,
  },

  AttributeValue: {
    type: DataTypes.STRING,
  },
});

module.exports = Attribute;
