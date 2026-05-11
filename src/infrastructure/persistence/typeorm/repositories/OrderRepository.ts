import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, FindOptionsWhere } from 'typeorm';
import { IOrderRepository } from '../../../../core/repositories/IOrderRepository.interface';
import { Order } from '../../../../core/entities/Order';
import { OrderEntity } from '../entities/OrderEntity';
import { OrderStatus } from '../../../../core/entities/variableObjects/OrderStatus.enum';
import { CakeType } from '../../../../core/entities/variableObjects/CakeType.enum';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repo: Repository<OrderEntity>,
  ) {}

  async findById(id: string): Promise<Order | null> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['customer', 'maker'],
    });
    return entity ? Order.fromPersistence(entity) : null;
  }

  async findByCustomerId(customerId: string): Promise<Order[]> {
    const entities = await this.repo.find({
      where: { customerId },
      order: { createdAt: 'DESC' },
    });
    return entities.map((entity) => Order.fromPersistence(entity));
  }

  async findByStatus(status: OrderStatus): Promise<Order[]> {
    const entities = await this.repo.find({ where: { status } });
    return entities.map((entity) => Order.fromPersistence(entity));
  }

  async findAvailableForMaker(
    makerId: string,
    cakeTypes: CakeType[],
  ): Promise<Order[]> {
    const where: FindOptionsWhere<OrderEntity> = {
      status: OrderStatus.NEW,
    };

    if (cakeTypes.length > 0) {
      where.cakeType = In(cakeTypes);
    }

    const entities = await this.repo.find({
      where,
      order: { createdAt: 'ASC' },
    });

    return entities.map((entity) => Order.fromPersistence(entity));
  }

  async save(order: Order): Promise<void> {
    const persistence = order.toPersistence();
    const entity = this.repo.create(persistence);
    await this.repo.save(entity);
  }

  async updateStatus(orderId: string, status: OrderStatus): Promise<void> {
    await this.repo.update(orderId, { status });
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
