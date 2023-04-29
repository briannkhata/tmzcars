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
      allowNull: false,
    },
    Role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AltPhone: {
      type: DataTypes.STRING,
      allowNull: true,
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
      allowNull: true,
    },
    City: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Region: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Photo: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    AddedBy: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    IdNumber: {
      type: DataTypes.STRING(100),
      defaultValue: null,
      allowNull: true,
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
  },
  {
    timestamps: false,
  }
);

module.exports = { User, sequelize };
