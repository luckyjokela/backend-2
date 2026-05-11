import { Order } from '../entities/Order';
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
