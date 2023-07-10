const express = require("express");
const mongoose = require("mongoose");
const router_v1 = require("./routes/v1");
require('dotenv').config()
const app = express();

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", require("./routes"));
app.use("/api/v1/", router_v1);
//configure mongoose
mongoose.connect(
  process.env.MONGO_URI || "mongodb://localhost:27017/CRUD",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;
 