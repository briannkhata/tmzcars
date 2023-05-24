const { Sequelize, DataTypes, DATE } = require("sequelize");
const sequelize = require("../database/database.js");

const Car = sequelize.define(
  "Cars",
  {
    CarId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Year: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    SellingPrice: {
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
    MakeId: {
      type: DataTypes.BIGINT,
    },
    ModelId: {
      type: DataTypes.BIGINT,
    },
    CarTypeId: {
      type: DataTypes.BIGINT,
    },
    FuelTypeId: {
      type: DataTypes.BIGINT,
    },
    TransmissionId: {
      type: DataTypes.BIGINT,
    },
    BodyId: {
      type: DataTypes.BIGINT,
    },
    ConditionId: {
      type: DataTypes.BIGINT,
    },
  },
  {
    timestamps: false,
  }
);

Car.associate = (models) => {
  Car.belongsTo(models.Model);
};
Car.associate = (models) => {
  Car.belongsTo(models.Make);
};
Car.associate = (models) => {
  Car.belongsTo(models.FuelType);
};
Car.associate = (models) => {
  Car.belongsTo(models.Condition);
};
Car.associate = (models) => {
  Car.belongsTo(models.Transmission);
};
Car.associate = (models) => {
  Car.belongsTo(models.CarType);
};
Car.associate = (models) => {
  Car.belongsTo(models.Body);
};

module.exports = { Car, sequelize };
