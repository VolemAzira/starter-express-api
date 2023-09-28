const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Database
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

// UserController
const getUser = (req, res) => {
  userSchema.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

const getUserById = (req, res) => {
  userSchema.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

const createUser = (req, res) => {
  userSchema.create(req.body, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

const updateUser = (req, res) => {
  userSchema.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

const deleteUser = (req, res) => {
  userSchema.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
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
router.delete("/user/:id", deleteUser); // Changed path for DELETE request

app.use(router);
app.all("/", (req, res) => {
  console.log("Just got a request!");
  res.send("Volemmm");
});

const PORT = process.env.PORT || 5000; // Set the port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
