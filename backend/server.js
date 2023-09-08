const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const bodyParser = require("body-parser");
const machineRoutes = require("./routes/machine");
app.use(cors());
app.use(bodyParser.json());
app.use("/machines", machineRoutes);
connectDB();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.listen(3000, (req, res) => {
  console.log("listening on port 3000");
});
