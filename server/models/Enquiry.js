const { DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");

const Enquiry = sequelize.define("Enquiries", {
  EnquiryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  Message: {
    type: DataTypes.TEXT,
  },
  Phone: {
    type: DataTypes.STRING(100),
  },
  Email: {
    type: DataTypes.STRING,
  },
  DateSent: {
    type: DataTypes.DATE,
  },
  Name: {
    type: DataTypes.STRING(100),
  },
});

module.exports = Enquiry;
