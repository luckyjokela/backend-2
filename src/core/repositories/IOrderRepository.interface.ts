import { Order } from '../entities/Order';

export interface IProductRepository {
  save(product: Product): Promise<void>;
  findById(id: string): Promise<Product | null>;
  findByVendorName(vendorName: string): Promise<Product[]>;
  findByPrice(priceRange: [number, number]): Promise<Product[]>;
  findByUsername(username: string): Promise<Product[]>;
  findByName(name: string): Promise<Product[]>;
  findByDescription(description: string): Promise<Product[]>;
  findByCategory(category: string): Promise<Product[]>;
  findByImage(imageUrl: string): Promise<Product[]>;
  findAll(): Promise<Product[]>;
  delete(id: string): Promise<void>;
}

export const ORDER_REPOSITORY_TOKEN = Symbol('I_ORDER_REPOSITORY');
