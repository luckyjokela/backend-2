// src/core/repositories/IProductRepository.interface.ts
import { Product } from '../entities/Product';

export interface IProductRepository {
  save(product: Product): Promise<void>;
  findById(id: string): Promise<Product | null>;
  findByMakerName(makerName: string): Promise<Product[]>;
  findByPrice(priceRange: [number, number]): Promise<Product[]>;
  findByUsername(username: string): Promise<Product[]>;
  findByName(name: string): Promise<Product[]>;
  findByDescription(description: string): Promise<Product[]>;
  findByCategory(category: string): Promise<Product[]>;
  findByImage(imageUrl: string): Promise<Product[]>;
  findAll(): Promise<Product[]>;
  delete(id: string): Promise<void>;
}

// ✅ Используем string вместо Symbol (как в USER_REPOSITORY_TOKEN)
export const PRODUCT_REPOSITORY_TOKEN = 'PRODUCT_REPOSITORY_TOKEN';