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

export class VendorName extends ValueObject<NameType> {
  static create(value: NameType): Result<VendorName> {
    if (!value || value.trim().length < 2 || value.length > 50) {
      return {
        success: false,
        error: 'Vendor name must be 2-50 characters long',
      };
    }
    if (filterXSS(value) !== value) {
      return {
        success: false,
        error: 'Vendor name contains unsafe characters',
      };
    }
    return { success: true, data: new VendorName(value) };
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

export class ProductDescription extends ValueObject<NameType> {
  static create(value: NameType): Result<ProductDescription> {
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
    return { success: true, data: new ProductPrice(value) };
  }
}

export class ProductImage extends ValueObject<NameType> {
  static create(value: NameType): Result<ProductImage> {
    if (!value || value.trim().length < 2 || value.length > 50) {
      return {
        success: false,
        error: 'Image URL must be 2-50 characters long',
      };
    }
    if (filterXSS(value) !== value) {
      return {
        success: false,
        error: 'Image URL contains unsafe characters',
      };
    }
    return { success: true, data: new ProductImage(value) };
  }
}
