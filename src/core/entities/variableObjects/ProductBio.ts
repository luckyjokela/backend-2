import { Result } from '../../shared/types/Result.type';

type NameType = string;
type DescriptionType = string;

export class ValueObject<T> {
  protected constructor(private readonly value: T) {}

  getValue(): T {
    return this.value;
  }
}

export class ProductName extends ValueObject<NameType> {
  static create(value: NameType): Result<ProductName> {
    if (!value || value.trim().length < 2 || value.length > 50) {
      return { success: false, error: 'Name must be 2-50 characters long' };
    }
    if (filterXSS(value) !== value) {
      return {
        success: false,
        error: 'Product name contains unsafe characters',
      };
    }
    return { success: true, data: new ProductName(value) };
  }
}

export class ProductDescription extends ValueObject<DescriptionType> {
  static create(value: DescriptionType): Result<ProductDescription> {
    if (!value || value.trim().length < 25 || value.length > 250) {
      return { success: false, error: 'Name must be 2-50 characters long' };
    }
    if (filterXSS(value) !== value) {
      return {
        success: false,
        error: 'Description contains unsafe characters',
      };
    }
    return { success: true, data: new ProductDescription(value) };
  }
}
