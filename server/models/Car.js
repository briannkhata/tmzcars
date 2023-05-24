const { Sequelize, DataTypes, DATE } = require("sequelize");
const sequelize = require("../database/database.js");

const Car = sequelize.define(
  "Cars",
  {
    CarId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoincrement: true,
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

const User = sequelize.define(
  "Users",
  {
    UserId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoincrement: true,
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

const Payment = sequelize.define(
  "Payments",
  {
    PaymentId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    TransId: {
      type: DataTypes.STRING,
    },
    Amount: {
      type: DataTypes.DOUBLE,
    },
    PaymentMethod: {
      type: DataTypes.STRING,
    },
    DatePaid: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
    },
    Deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

const Model = sequelize.define(
  "Models",
  {
    ModelId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Model: {
      type: DataTypes.STRING,
    },
    Deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

const CarType = sequelize.define(
  "CarType",
  {
    CarTypeId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    CarType: {
      type: DataTypes.STRING,
    },
    Deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

const Body = sequelize.define(
  "Bodies",
  {
    BodyId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Body: {
      type: DataTypes.STRING,
    },
    Deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

const FuelType = sequelize.define(
  "FuelTypes",
  {
    FuelTypeId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    FuelType: {
      type: DataTypes.STRING,
    },
    Deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

const Condition = sequelize.define(
  "Conditions",
  {
    ConditionId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Condition: {
      type: DataTypes.STRING,
    },
    Deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

const Transmission = sequelize.define(
  "Transmissions",
  {
    TransmissionId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Transmission: {
      type: DataTypes.STRING,
    },
    Deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

const Make = sequelize.define(
  "Makes",
  {
    MakeId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Make: {
      type: DataTypes.STRING,
    },
    Deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);
const Photo = sequelize.define(
  "Photos",
  {
    PhotoId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Photo: {
      type: DataTypes.STRING,
    },
    CarId: {
      type: DataTypes.BIGINT,
      foreignKey: {
        column: "CarId",
        referencedTable: "Car",
      },
    },
  },
  {
    timestamps: false,
  }
);

const Feature = sequelize.define(
  "Features",
  {
    FeatureId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    DateAdded: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Date.now,
    },
    Deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    CarId: {
      type: DataTypes.BIGINT,
      foreignKey: {
        column: "CarId",
        referencedTable: "Car",
      },
    },
  },
  {
    timestamps: false,
  }
);

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

Car.hasMany(Photo, {
  foreignKey: "CarId",
});
Photo.belongsTo(Car, {
  foreignKey: "CarId",
});

Car.hasMany(Feature, {
  foreignKey: "CarId",
});
Feature.belongsTo(Car, {
  foreignKey: "CarId",
});

Car.hasMany(Payment, {
  foreignKey: "CarId",
});

Payment.belongsTo(Car, {
  foreignKey: "CarId",
});

Car.hasMany(Enquiry, {
  foreignKey: "CarId",
});
Enquiry.belongsTo(Car, {
  foreignKey: "CarId",
});

Body.hasMany(Car, {
  foreignKey: "BodyId",
});
Car.belongsTo(Body, {
  foreignKey: "BodyId",
});

module.exports = {
  Car,
  User,
  Feature,
  Model,
  Make,
  CarType,
  Transmission,
  FuelType,
  Body,
  Condition,
  Payment,
  Photo,
  sequelize,
};
