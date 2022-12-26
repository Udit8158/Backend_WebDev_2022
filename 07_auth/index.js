const express = require("express");
const logInRoute = require("./routers/logIn");
const registerRouter = require("./routers/register");

const app = express();

app.use(express.json());
app.use("/register", registerRouter);
app.use("/login", logInRoute);

app.listen(3000, () => console.log("Sever is running on port 3000"));
