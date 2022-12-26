import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
const app = express();

// use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", userRoute);

app.listen(3000, () => console.log("Server is running on port 3000"));
