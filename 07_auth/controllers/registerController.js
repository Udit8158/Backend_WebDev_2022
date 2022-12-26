const userDB = {
  users: require("../data/users.json"),
  setUsers: function (usr) {
    this.users = usr;
  },
};
const bcrypt = require("bcrypt");
const fsPromise = require("fs/promises");
const path = require("path");

const registerNewUser = async (req, res) => {
  const { userName, password } = req.body;
  const { users } = userDB;

  // If not username and passwd provided
  if (!userName || !password)
    res.status(400).json({ message: "Username and password required" });

  // if user already exists
  const duplicateUser = users.find((user) => user.userName === userName);
  if (duplicateUser) {
    return res.status(400).json({ message: "User already registered" });
  }

  // Register new user
  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = {
      userName,
      password: hashPassword,
    };

    // set new user with encrypted password
    users.push(newUser);

    await fsPromise.writeFile(
      path.join(__dirname, "..", "data", "users.json"),
      JSON.stringify(users)
    );
    res.json({
      message: `User with username ${userName} created successfully`,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registerNewUser };
