const express = require("express");
const logInRoute = require("./routers/logIn");
const registerRouter = require("./routers/register");
const cookieParser = require("cookie-parser");
const verifyJwt = require("./middlewares/verifyJwt");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/register", registerRouter);
app.use("/login", logInRoute);
app.get("/posts", verifyJwt, (req, res) => {
  res.json({ posts: [{ id: "1", title: "Hello" }] });
  console.log(req.user);
});

app.listen(3000, () => console.log("Sever is running on port 3000"));
