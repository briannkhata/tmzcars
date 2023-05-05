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
    secret: "codeforgeek",
    saveUninitialized: true,
    resave: true,
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

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`App Running on Port ${PORT}`);
  }
});
