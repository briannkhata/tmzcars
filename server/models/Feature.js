const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("<database_name>", "<username>", "<password>", {
  host: "<host_name>",
  dialect: "mysql",
});

const Feature = sequelize.define("Features", {
  FeatureId: {
    type: DataTypes.UUID,
    defaultValue: uuidv4(),
    primaryKey: true,
  },
  DateAdded: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  TransId: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  AddBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Feature;
