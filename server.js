const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const userRoutes = require("./model.js/routes/userRoutes");
app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});