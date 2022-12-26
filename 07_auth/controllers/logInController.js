const users = require("../data/users.json");
const bcrypt = require("bcrypt");

const logInUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // check req have a username and password
    if (!userName || !password)
      return res
        .status(400)
        .json({ message: "Username and password required" });

    // check if user exists
    const foundUser = users.find((user) => user.userName === userName);
    if (!foundUser) return res.status(401).json({ message: "User not found" });

    // check if password is correct
    const matchPassword = await bcrypt.compare(password, foundUser.password);

    if (!matchPassword) {
      return res.status(401).json({ message: "Password does not match" });
    } else {
      // TODO: JWTs
      return res.status(200).json({
        message: `Welcome ${foundUser.userName} logged in successfully`,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = logInUser;
