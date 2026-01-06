import { Result } from '../../shared/types/Result.type';
import { filterXSS } from 'xss';

type NameType = string;

export class ValueObject<T> {
  protected constructor(private readonly value: T) {}

  getValue(): T {
    return this.value;
  }
}

export class Username extends ValueObject<NameType> {
  static create(value: NameType): Result<Username> {
    if (!value || value.trim().length < 3 || value.length > 30) {
      return { success: false, error: 'Username must be 3-30 characters long' };
    }
    if (filterXSS(value) !== value) {
      return { success: false, error: 'Username contains unsafe characters' };
    }
    const isValid = /^[a-zA-Z0-9_.-]+$/.test(value);
    if (!isValid) {
      return { success: false, error: 'Username contains invalid characters' };
    }
    return { success: true, data: new Username(value) };
  }
}

export class Name extends ValueObject<NameType> {
  static create(value: NameType): Result<Name> {
    if (!value || value.trim().length < 2 || value.length > 50) {
      return { success: false, error: 'Name must be 2-50 characters long' };
    }
    if (filterXSS(value) !== value) {
      return { success: false, error: 'Name contains unsafe characters' };
    }
    return { success: true, data: new Name(value) };
  }
}

export class MiddleName extends ValueObject<NameType> {
  static create(value: NameType): Result<MiddleName> {
    if (!value || value.trim().length < 2 || value.length > 50) {
      return {
        success: false,
        error: 'MiddleName must be 2-50 characters long',
      };
    }
    if (filterXSS(value) !== value) {
      return { success: false, error: 'MiddleName contains unsafe characters' };
    }
    return { success: true, data: new MiddleName(value) };
  }
}

export class Surname extends ValueObject<NameType> {
  static create(value: NameType): Result<Surname> {
    if (!value || value.trim().length < 2 || value.length > 50) {
      return { success: false, error: 'Surname must be 2-50 characters long' };
    }
    if (filterXSS(value) !== value) {
      return { success: false, error: 'Surname contains unsafe characters' };
    }
    return { success: true, data: new Surname(value) };
  }
}
