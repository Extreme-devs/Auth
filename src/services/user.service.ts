import User from "../models/user.model";
import HashService from "./hash.service";
import ValidatorService from "./validator.service";

class UserService {
  private userModel: User;
  constructor() {
    this.userModel = new User();
  }
  async createUser(
    name: string,
    email: string,
    phone_number: string,
    password: string,
  ) {
    try {
      if (!ValidatorService.validateEmail(email)) {
        throw new Error("Invalid email");
      }
      if (!ValidatorService.validatePhoneNumber(phone_number)) {
        throw new Error("Invalid phone number");
      }
      const hashedPassword = await HashService.hashPassword(password);
      await this.userModel.createUser(
        name,
        email,
        phone_number,
        hashedPassword,
      );
    } catch (error) {
      throw new Error("Failed to create user");
    }
  }
  async getUserById(id: number) {
    try {
      return await this.userModel.getUserById(id);
    } catch (error) {
      throw new Error("Failed to get user");
    }
  }
  async getUserByEmail(email: string) {
    try {
      return await this.userModel.getUserByEmail(email);
    } catch (error) {
      throw new Error("Failed to get user");
    }
  }
  async updateUser(
    id: number,
    name: string,
    email: string,
    phone_number: string,
    password: string,
  ) {
    try {
      if (!ValidatorService.validateEmail(email)) {
        throw new Error("Invalid email");
      }
      if (!ValidatorService.validatePhoneNumber(phone_number)) {
        throw new Error("Invalid phone number");
      }
      const hashedPassword = await HashService.hashPassword(password);
      await this.userModel.updateUser(
        id,
        name,
        email,
        phone_number,
        hashedPassword,
      );
    } catch (error) {
      throw new Error("Failed to update user");
    }
  }
  async deleteUser(id: number) {
    try {
      await this.userModel.deleteUser(id);
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  }
}

export default UserService;
