const { Sequelize, DataTypes, DATE } = require("sequelize");
const sequelize = require("../database/database.js");
const { User } = require("../models/User.js");
const { CarType } = require("../models/CarType.js");
const { Model } = require("../models/Model.js");
const { Transmission } = require("../models/Transmission.js");
const { Make } = require("../models/Make.js");
const { FuelType } = require("../models/FuelType.js");
const { Body } = require("../models/Body.js");
const { Condition } = require("../models/Condition.js");

const Car = sequelize.define(
  "Cars",
  {
    CarId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Year: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    SellingPrice: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    TmzSellingPrice: {
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
    Deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    DateAdded: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
    },
    OtherDetails: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    YearBought: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },

    YearsUsed: {
      type: DataTypes.STRING(200),
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
    InteriorColor: {
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
    UserId: {
      type: DataTypes.BIGINT,
      foreignKey: {
        column: "UserId",
        referencedTable: "User",
      },
    },
    MakeId: {
      type: DataTypes.BIGINT,
      foreignKey: {
        column: "MakeId",
        referencedTable: "Make",
      },
    },
    ModelId: {
      type: DataTypes.BIGINT,
      foreignKey: {
        column: "ModelId",
        referencedTable: "Model",
      },
    },
    CarTypeId: {
      type: DataTypes.BIGINT,
      foreignKey: {
        column: "CarTypeId",
        referencedTable: "CarType",
      },
    },
    FuelTypeId: {
      type: DataTypes.BIGINT,
      foreignKey: {
        column: "FuelTypeId",
        referencedTable: "FuelType",
      },
    },
    TransmissionId: {
      type: DataTypes.BIGINT,
      foreignKey: {
        column: "TransmissionId",
        referencedTable: "Transmission",
      },
    },
    BodyId: {
      type: DataTypes.BIGINT,
      foreignKey: {
        column: "BodyId",
        referencedTable: "Body",
      },
    },
    ConditionId: {
      type: DataTypes.BIGINT,
      foreignKey: {
        column: "ConditionId",
        referencedTable: "Condition",
      },
    },
  },
  {
    timestamps: false,
  }
);

Model.hasMany(Car, {
  foreignKey: "ModelId",
});
Car.belongsTo(Model, {
  foreignKey: "ModelId",
});

Make.hasMany(Car, {
  foreignKey: "MakeId",
});
Car.belongsTo(Make, {
  foreignKey: "MakeId",
});

Transmission.hasMany(Car, {
  foreignKey: "TransmissionId",
});
Car.belongsTo(Transmission, {
  foreignKey: "TransmissionId",
});

Condition.hasMany(Car, {
  foreignKey: "ConditionId",
});
Car.belongsTo(Condition, {
  foreignKey: "ConditionId",
});

FuelType.hasMany(Car, {
  foreignKey: "FuelTypeId",
});
Car.belongsTo(FuelType, {
  foreignKey: "FuelTypeId",
  onUpdate: "CASCADE",
});

CarType.hasMany(Car, {
  foreignKey: "CarTypeId",
});
Car.belongsTo(CarType, {
  foreignKey: "CarTypeId",
});

User.hasMany(Car, {
  foreignKey: "UserId",
});
Car.belongsTo(User, {
  foreignKey: "UserId",
});

Body.hasMany(Car, {
  foreignKey: "BodyId",
});
Car.belongsTo(Body, {
  foreignKey: "BodyId",
});

module.exports = {
  Car,
  Sequelize,
};
