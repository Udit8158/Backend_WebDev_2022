import { v4 as uuid } from "uuid";

let users = [];

const getUsers = (req, res) => {
  users.length > 0 && res.json(users);
  users.length === 0 && res.json("No users found");
};

const getIndividualUser = (req, res) => {
  const userId = req.params["id"];

  const user = users.find((user) => user.id === userId);
  if (!user) {
    res.json("NO USER FOUND");
    return;
  }
  res.json(user);
};

const createUser = (req, res) => {
  const newUser = req.body;
  newUser.id = uuid();
  users.push(newUser);
  res.json(`User with id ${userId} has been created successfully.`);
};

const deleteIndividualUser = (req, res) => {
  const userId = req.params["id"];
  const user = users.find((user) => user.id === userId);
  if (!user) {
    res.json("NO USER FOUND");
    return;
  }
  users = users.filter((user) => user.id !== userId);
  res.json(`User with id ${userId} has been deleted successfully.`);
};

const updateUser = (req, res) => {
  const userId = req.params["id"];
  const userToBeUpdated = users.find((user) => user.id === userId);

  const { name, age } = req.body;

  if (name) userToBeUpdated.name = name;
  if (age) userToBeUpdated.age = age;
  res.json(`User with id ${userId} has been updated successfully.`);
};

export {
  getUsers,
  getIndividualUser,
  createUser,
  deleteIndividualUser,
  updateUser,
};
