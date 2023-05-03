const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Message = sequelize.define(
  "Messages",
  {
    MessageId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Phone: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    DateAdded: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Date.now,
    },
    Deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Message, sequelize };
