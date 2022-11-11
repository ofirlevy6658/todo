const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const routes = require("./routes/ToDoRoute");

const app = express();
const PORT = 5000;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1:27017/todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb Connected"))
  .catch((err) => console.error(err));

app.use(routes);

app.listen(PORT, () => console.log("Server running on port " + PORT));
