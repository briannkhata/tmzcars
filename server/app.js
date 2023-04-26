const express = require("express");
const homeRouter = require("./routes/home.js");
const path = require("path");

const carRouter = require("./routes/car.js");

const app = express();

const PORT = process.env.PORT || 5002;

const publicDirectory = path.join(__dirname, "./public/");
app.use(express.static(publicDirectory));
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", homeRouter);
app.use("/car/", carRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
  }
});
