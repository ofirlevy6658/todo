import cors from "cors";
import express from "express";
import routes from "./routes/ToDoRoute";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// mongoose
//   .connect("mongodb://127.0.0.1:27017/todo", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Mongodb Connected"))
//   .catch((err) => console.error(err));

app.use(routes);

app.listen(PORT, () => console.log("Server running on port " + PORT));
