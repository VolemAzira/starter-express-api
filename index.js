const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const UserRouter = require("./routes/UserRouter.js");

app.use(cors());
app.use(express.json());

const connection = mongoose.connect(
  "mongodb+srv://volemportfolio:WJFuWjN159FErP9U@cluster0.hbx7pjj.mongodb.net/DBusers?retryWrites=true&w=majority"
);
if (connection) {
  console.log("Connected to MongoDB");
} else {
  console.log("Error connecting to MongoDB");
}

app.use(UserRouter);

app.all("/", (req, res) => {
  console.log("Just got a request!");
  res.send("Volemmm");
});
app.listen(process.env.PORT || 3000);
