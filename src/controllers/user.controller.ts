import UserService from "../services/user.service";
import { Request, Response } from "express";

class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  createUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, phone_number, password } = req.body;
    if (!name || !email || !phone_number || !password) {
      res
        .status(400)
        .json({
          message: "Name, email, phone number and password are required",
        });
      return;
    }
    try {
      await this.userService.createUser(name, email, phone_number, password);
      res.status(201).json({ message: "User created successfully" });
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: "Failed to create user", error: error.message });
      } else {
        res.status(500).json({ message: "Failed to create user", error: "An unknown error occurred" });
      }
      return;
    }
  };
  getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Id is required" });
      return;
    }
    try {
      const user = await this.userService.getUserById(parseInt(id));
      res.status(200).json(user);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: "Failed to get user", error: error.message });
      } else {
        res.status(500).json({ message: "Failed to get user", error: "An unknown error occurred" });
      }
      return;
    }
  };
  getUserByEmail = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.params;
    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }
    try {
      const user = await this.userService.getUserByEmail(email);
      res.status(200).json(user);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: "Failed to get user", error: error.message });
      } else {
        res.status(500).json({ message: "Failed to get user", error: "An unknown error occurred" });
      }
      return;
    }
  };
  updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, email, phone_number, password } = req.body;
    if (!name || !email || !phone_number || !password) {
      res
        .status(400)
        .json({
          message: "Name, email, phone number and password are required",
        });
      return;
    }
    try {
      await this.userService.updateUser(
        parseInt(id),
        name,
        email,
        phone_number,
        password,
      );
      res.status(200).json({ message: "User updated successfully" });
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: "Failed to update user", error: error.message });
      } else {
        res.status(500).json({ message: "Failed to update user", error: "An unknown error occurred" });
      }
      return;
    }
  };
  deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      await this.userService.deleteUser(parseInt(id));
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: "Failed to delete user", error: error.message });
      } else {
        res.status(500).json({ message: "Failed to delete user", error: "An unknown error occurred" });
      }
      return;
    }
  };
}

export default UserController;
