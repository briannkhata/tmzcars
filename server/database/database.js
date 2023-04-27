const Sequelize = require("sequelize");
require("dotenv").config();

// const sequelize = new Sequelize(
//   " postgres://tmzcars:Epd2o4vBCauEqgv8VaWAdssIDVteYvk4@dpg-ch0fsob3cv2c5b44ralg-a/tmzcars"
//   // database: "craftads",
//   // username: "craftads",
//   // password: "Epd2o4vBCauEqgv8VaWAdssIDVteYvk4",
//   // host: "",
//   // port: "5432",
//   // dialect: "postgres",
// );

const sequelize = new Sequelize("tmzcars", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  let retries = 5;

  while (retries > 0) {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
      break;
    } catch (error) {
      console.error("Unable to connect to the database:", error);

      retries--;
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
})();

module.exports = sequelize;
