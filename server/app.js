const express = require("express");
const homeRouter = require("./routes/home.js");
const carRouter = require("./routes/car.js");

const app = express();

const PORT = process.env.PORT || 5002;

app.use("/", homeRouter);
app.use("/car/", carRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
  }
});
