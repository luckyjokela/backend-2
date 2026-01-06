import { IPasswordHasher } from '../../core/shared/interface/IPasswordHasher.interface';
import * as bcrypt from 'bcrypt';

export class BcryptPasswordHasher implements IPasswordHasher {
  hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  compare(plainText: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashed);
  }
}
