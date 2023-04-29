const { DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");

const Enquiry = sequelize.define("Enquiries", {
  EnquiryId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
    defaultValue: Date.now,
  },
  Name: {
    type: DataTypes.STRING(100),
  },
});

module.exports = { Enquiry, sequelize };
