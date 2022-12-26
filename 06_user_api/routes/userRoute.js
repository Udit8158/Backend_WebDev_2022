import express from "express";
import {
  createUser,
  getIndividualUser,
  getUsers,
  deleteIndividualUser,
  updateUser,
} from "../controllers/userController.js";

const userRoute = express();

userRoute.route("/").get(getUsers).post(createUser);
userRoute
  .route("/:id")
  .get(getIndividualUser)
  .delete(deleteIndividualUser)
  .patch(updateUser);

export default userRoute;
