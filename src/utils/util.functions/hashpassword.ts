import { hash, genSalt } from "bcryptjs";

export default class EcryptPassword {
  static async hashPassword(password: string) {
    const salt = await genSalt(10);
    try {
      const hashedPassword = await hash(password, salt);
      return hashedPassword;
    } catch (error) {
      return error.message;
    }
  }
}
