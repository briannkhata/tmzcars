const express = require("express");
const app = express();
const PORT = process.env.PORT || 5003;

app.use(express.static(__dirname + "/public"));
app.set("views", "./views"); // Set the views directory
app.set("view engine", "ejs");
app.use("/", require("./routes/home"));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`App Running on Port ${PORT}`);
  }
});
