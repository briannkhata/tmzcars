const express = require("express");

const app = express();

const PORT = process.env.PORT || 5002;

app.get("/", (req, res) => {
  res.send("Hello TMZ Cars");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
  }
});
