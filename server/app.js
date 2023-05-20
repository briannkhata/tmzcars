const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const multer = require("multer");

const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const initializePassport = require("./database/passport-configs.js");

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

app.use(
  fileUpload({
    limits: {
      fileSize: 10000000, // Around 10MB
    },
    abortOnLimit: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/home/", require("./routes/home.js"));
app.use("/api/v1/car/", require("./routes/car.js"));
app.use("/api/v1/body/", require("./routes/body.js"));
app.use("/api/v1/cartype/", require("./routes/cartype.js"));
app.use("/api/v1/enquiry/", require("./routes/enquiry.js"));
app.use("/api/v1/condition/", require("./routes/condition.js"));
app.use("/api/v1/user/", require("./routes/user.js"));
app.use("/api/v1/message/", require("./routes/message.js"));
app.use("/api/v1/plan/", require("./routes/plan.js"));
app.use("/api/v1/feature/", require("./routes/feature.js"));
app.use("/api/v1/photo/", require("./routes/photo.js"));
app.use("/api/v1/setting/", require("./routes/setting.js"));
app.use("/api/v1/model/", require("./routes/model.js"));
app.use("/api/v1/make/", require("./routes/make.js"));
app.use("/api/v1/transmission/", require("./routes/transmission.js"));
app.use("/api/v1/fueltype/", require("./routes/fueltype.js"));
app.use("/api/v1/idtype/", require("./routes/idtype.js"));
app.use("/api/v1/testimonial/", require("./routes/testimonial.js"));
app.use("/api/v1/faq/", require("./routes/faq.js"));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
  }
});
