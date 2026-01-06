// Password.ts
import { IPasswordHasher } from '../../../core/shared/interface/IPasswordHasher.interface';
import { Result } from '../../shared/types/Result.type';
import { PasswordValidator } from './PasswordValidator';

export class Password {
  private readonly value: string;

  private constructor(hashedValue: string) {
    this.value = hashedValue;
  }

  static async create(
    password: string,
    hasher: IPasswordHasher,
  ): Promise<Result<Password>> {
    const validation = PasswordValidator.validate(password);
    if (!validation.success) {
      if (!validation.error) {
        return { success: false, error: 'Invalid password' };
      }
      return { success: false, error: validation.error };
    }

    try {
      const hashed = await hasher.hash(password);
      return { success: true, data: new Password(hashed) };
    } catch (error) {
      console.error('Ошибка при хешировании пароля:', error);
      return { success: false, error: 'Error hashing password' };
    }
  }

  static fromHash(hash: string): Result<Password> {
    const bcryptRegex = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;
    if (!hash || typeof hash !== 'string' || !bcryptRegex.test(hash)) {
      return { success: false, error: 'Invalid password hash' };
    }
    return { success: true, data: new Password(hash) };
  }

  getValue(): string {
    return this.value;
  }
}
