const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const UserRouter = require("./routes/UserRouter.js");

app.use(cors());
app.use(express.json());

// Database
mongoose
  .connect(
    "mongodb+srv://volemportfolio:WJFuWjN159FErP9U@cluster0.hbx7pjj.mongodb.net/DBusers?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

// UserController
const getUser = (req, res) => {
  User.find({}, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(data);
    }
  });
};

const getUserById = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(data);
    }
  });
};

const createUser = (req, res) => {
  User.create(req.body, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(data);
    }
  });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(data);
    }
  });
};

const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(data);
    }
  });
};

// UserRouter
const router = express.Router();

router.get("/user", getUser);
router.get("/user/:id", getUserById);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

app.use(router);
app.all("/", (req, res) => {
  console.log("Just got a request!");
  res.send("Volemmm");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
