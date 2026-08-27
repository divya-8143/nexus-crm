import bcrypt from 'bcryptjs';
import { Config } from '../config/env';

export class PasswordHasher {
  public static async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(Config.PASSWORD_SALT_ROUNDS);
    return bcrypt.hash(password, salt);
  }

  public static async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
