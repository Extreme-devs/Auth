import UserController from "../controllers/user.controller";
import { Router } from "express";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", userController.createUser);
userRoutes.get("/:id", userController.getUserById);
userRoutes.get("/email/:email", userController.getUserByEmail);
userRoutes.put("/:id", userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);

export default userRoutes;
