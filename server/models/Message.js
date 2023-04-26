const sequelize = new Sequelize("database_name", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});

const Message = sequelize.define("Messages", {
  MessageId: {
    type: DataTypes.UUID,
    defaultValue: uuidv4(),
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
  },
  Deleted: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Message;
