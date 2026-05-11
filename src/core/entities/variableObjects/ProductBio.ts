// src/core/entities/variableObjects/ProductBio.ts
import { Result } from '../../shared/types/Result.type';
import { filterXSS } from 'xss';

type NameType = string;
type PriceType = number;

export class ValueObject<T> {
  protected constructor(private readonly value: T) {}

  getValue(): T {
    return this.value;
  }
}

export class MakerName extends ValueObject<NameType> {
  static create(value: NameType): Result<MakerName> {
    if (!value || value.trim().length < 2 || value.length > 50) {
      return {
        success: false,
        error: 'Maker name must be 2-50 characters long',
      };
    }
    if (filterXSS(value) !== value) {
      return {
        success: false,
        error: 'Maker name contains unsafe characters',
      };
    }
    return { success: true, data: new MakerName(value) };
  }
}

export class ProductName extends ValueObject<NameType> {
  static create(value: NameType): Result<ProductName> {
    if (!value || value.trim().length < 2 || value.length > 50) {
      return {
        success: false,
        error: 'Product name must be 2-50 characters long',
      };
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

export class ProductDescription extends ValueObject<NameType> {
  static create(value: NameType): Result<ProductDescription> {
    if (!value || value.trim().length < 25 || value.length > 250) {
      return {
        success: false,
        error: 'Description must be 25-250 characters long',
      };
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

export class ProductCategory extends ValueObject<NameType> {
  static create(value: NameType): Result<ProductCategory> {
    if (!value || value.trim().length < 2 || value.length > 50) {
      return { success: false, error: 'Category must be 2-50 characters long' };
    }
    if (filterXSS(value) !== value) {
      return {
        success: false,
        error: 'Category contains unsafe characters',
      };
    }
    return { success: true, data: new ProductCategory(value) };
  }
}

export class ProductPrice extends ValueObject<PriceType> {
  static create(value: PriceType): Result<ProductPrice> {
    if (value <= 0) {
      return { success: false, error: 'Price must be greater than zero' };
    }
    if (value > 1_000_000) {
      return { success: false, error: 'Price cannot exceed 1,000,000' };
    }
    if (!Number.isFinite(value)) {
      return { success: false, error: 'Price must be a valid number' };
    }
    return { success: true, data: new ProductPrice(value) };
  }
}

export class ProductImage extends ValueObject<NameType> {
  static create(value: NameType): Result<ProductImage> {
    if (!value || value.trim().length < 10 || value.length > 500) {
      return {
        success: false,
        error: 'Image URL must be 10-500 characters long',
      };
    }
    if (filterXSS(value) !== value) {
      return {
        success: false,
        error: 'Image URL contains unsafe characters',
      };
    }
    if (!value.startsWith('http://') && !value.startsWith('https://')) {
      return {
        success: false,
        error: 'Image URL must start with http:// or https://',
      };
    }
    return { success: true, data: new ProductImage(value) };
  }
}
