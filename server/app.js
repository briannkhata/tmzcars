const express = require("express");
const homeRouter = require("./routes/home.js");
const path = require("path");
const hbs = require("hbs");
const carRouter = require("./routes/car.js");
const app = express();

const PORT = process.env.PORT || 5002;

hbs.registerPartials(path.join(__dirname, "views/partials"), (err) => {});
app.use(express.static(path.join(__dirname, "./public/")));
app.set("views", path.join(__dirname, "views"));
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
