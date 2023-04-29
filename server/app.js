const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");

const homeRouter = require("./routes/home.js");
const carRouter = require("./routes/car.js");
const bodyRouter = require("./routes/body.js");
const cartypeRouter = require("./routes/cartype.js");
const enquiryRouter = require("./routes/enquiry.js");
const conditionRouter = require("./routes/condition.js");

const app = express();

const PORT = process.env.PORT || 5002;

hbs.registerPartials(path.join(__dirname, "views/partials"), (err) => {});
app.use(express.static(path.join(__dirname, "./public/")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/", homeRouter);
app.use("/api/v1/car/", carRouter);
app.use("/api/v1/body/", bodyRouter);
app.use("/api/v1/cartype/", cartypeRouter);
app.use("/api/v1/enquiry/", enquiryRouter);
app.use("/api/v1/condition/", conditionRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
  }
});
