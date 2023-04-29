const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");
const User = sequelize.define(
  "Users",
  {
    UserId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
    },
    Password: {
      type: DataTypes.STRING,
    },
    Role: {
      type: DataTypes.STRING,
    },
    Address: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
    },
    Phone: {
      type: DataTypes.STRING,
    },
    AltPhone: {
      type: DataTypes.STRING,
    },

    Deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    DateAdded: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
    },
    Country: {
      type: DataTypes.STRING(100),
    },
    City: {
      type: DataTypes.STRING(100),
    },
    Region: {
      type: DataTypes.STRING(100),
    },
    Photo: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    AddedBy: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    IdNumber: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    DateVerified: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    Terms: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    Profession: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },

    About: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
