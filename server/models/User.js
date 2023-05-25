const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");
const { IdType } = require("../models/IdType.js");

const User = sequelize.define(
  "Users",
  {
    UserId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
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
    IdTypeId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      foreignKey: {
        column: "IdTypeId",
        referencedTable: "IdType",
      },
    },
  },
  {
    timestamps: false,
  }
);

User.belongsTo(IdType, { foreignKey: "IdTypeId" });
IdType.hasMany(User, { foreignKey: "IdTypeId" });

module.exports = { User, sequelize };
