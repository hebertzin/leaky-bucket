
import bcrypt from "bcrypt";
import { Hash } from "../../domain/Hash";

export class BcryptHashService implements Hash {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}