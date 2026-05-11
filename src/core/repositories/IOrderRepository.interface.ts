import { Order } from '../entities/Order';
<<<<<<< HEAD

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
=======
import { OrderStatus } from '../entities/variableObjects/OrderStatus.enum';
import { CakeType } from '../entities/variableObjects/CakeType.enum';

export interface IOrderRepository {
  findById(id: string): Promise<Order | null>;
  findByCustomerId(customerId: string): Promise<Order[]>;
  findByStatus(status: OrderStatus): Promise<Order[]>;
  findAvailableForMaker(
    makerId: string,
    cakeTypes: CakeType[],
  ): Promise<Order[]>;
  save(order: Order): Promise<void>;
  updateStatus(orderId: string, status: OrderStatus): Promise<void>;
  delete(id: string): Promise<void>;
}

export const ORDER_REPOSITORY_TOKEN = 'I_ORDER_REPOSITORY_TOKEN';
>>>>>>> 33b11ba (update)
