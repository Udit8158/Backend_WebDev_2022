require("dotenv").config(); // using environment variable
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const { verifyToken } = require("./middlewares/verifyToken");
const authRouter = require("./routes/auth");
const postsRouter = require("./routes/posts");
const cors = require("cors");

const app = express();
const dbURI =
  "mongodb+srv://udit2022:udit2022testing@cluster0.q4p7v5d.mongodb.net/mongo_tut?retryWrites=true&w=majority";

// DB Connection
mongoose.set("strictQuery", false);
mongoose
  .connect(dbURI)
  .then(console.log("DB connection established"))
  .catch((err) => console.log(err));

//Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//routes

app.use("/api/auth", authRouter);

app.use("/api/posts", verifyToken, postsRouter);
app.use("/api/posts/:id", verifyToken, postsRouter);

// server start
app.listen(5000, () => console.log("Server listening on port 5000"));
