const { Sequelize, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const sequelize = new Sequelize("postgres://user:pass@example.com:5432/dbname");

const Applicant = sequelize.define("Applicants", {
  ApplicantId: {
    type: DataTypes.UUID,
    defaultValue: uuidv4(),
    primaryKey: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: true,
    charset: "latin1",
  },
  Phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Deleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  DateApplied: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Post: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Qualification: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Applicant;
