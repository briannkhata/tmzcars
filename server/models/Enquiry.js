const { DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");

const Enquiry = sequelize.define(
  "Enquiries",
  {
    EnquiryId: {
      type: DataTypes.BIGINT,
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
      defaultValue: Date.now,
    },
    Name: {
      type: DataTypes.STRING(100),
    },
  },
  {
    timestamps: false,
  }
);

// Enquiry.associate = (models) => {
//   Enquiry.hasMany(models.Car);
// };

module.exports = { Enquiry, sequelize };
