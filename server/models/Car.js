const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");

const Car = sequelize.define(
  "Cars",
  {
    CarId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    CarNo: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    Year: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    SellingPrice: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    SellingPriceAlt: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    Mileage: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    Engine: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    DriveTrain: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    Deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    ReasonForDelete: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    DeleteDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    DeletedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    AddedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    DateAdded: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Featured: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    TransId: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    TransIdDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    BuildDate: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    ComplianceDate: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Series: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    FuelConsumption: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    Warrant: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    CountryOfManufacture: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    ServiceHistory: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    InterioColor: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ExteriorColor: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Steering: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    RegNo: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Car, sequelize };
