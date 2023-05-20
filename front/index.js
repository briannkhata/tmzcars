const express = require("express");
const app = express();
const PORT = process.env.PORT || 5003;
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    cookie: { maxAge: 60000 },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: "true",
    secret: "secret",
  })
);

app.use(flash());
app.use(express.static(__dirname + "/public"));
app.set("views", "./views");
app.set("view engine", "ejs");
app.use("/", require("./routes/home"));
app.use("/user/", require("./routes/user"));
app.use("/car/", require("./routes/car"));
app.use("/faq/", require("./routes/faq"));
app.use("/model/", require("./routes/model"));
app.use("/make/", require("./routes/make"));
app.use("/body/", require("./routes/body"));
app.use("/condition/", require("./routes/condition"));
app.use("/cartype/", require("./routes/cartype"));
app.use("/transmission/", require("./routes/transmission"));
app.use("/fueltype/", require("./routes/fueltype"));
app.use("/idtype/", require("./routes/idtype"));
app.use("/message/", require("./routes/message"));
app.use("/setting/", require("./routes/setting"));
app.use("/testimonial/", require("./routes/testimonial"));
app.use("/applicant/", require("./routes/applicant"));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`App Running on Port ${PORT}`);
  }
});
