const express = require("express");
const bodyParser = require("body-parser");

const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const initializePassport = require("./database/passport-configs.js");

const homeRouter = require("./routes/home.js");
const carRouter = require("./routes/car.js");
const bodyRouter = require("./routes/body.js");
const cartypeRouter = require("./routes/cartype.js");
const enquiryRouter = require("./routes/enquiry.js");
const conditionRouter = require("./routes/condition.js");
const userRouter = require("./routes/user.js");

const app = express();

initializePassport(passport);

const PORT = process.env.PORT || 5002;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/home/", homeRouter);
app.use("/api/v1/car/", carRouter);
app.use("/api/v1/body/", bodyRouter);
app.use("/api/v1/cartype/", cartypeRouter);
app.use("/api/v1/enquiry/", enquiryRouter);
app.use("/api/v1/condition/", conditionRouter);
app.use("/api/v1/user/", userRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
  }
});
