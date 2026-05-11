<<<<<<< HEAD
import { Id } from './variableObjects/IdGenerator';

export class Order {
  constructor(private readonly id: Id) {}
  // other code
=======
// src/core/entities/Order.ts
import { OrderStatus } from './variableObjects/OrderStatus.enum';
import { CakeType } from './variableObjects/CakeType.enum';
import { Id } from './variableObjects/IdGenerator';
import { Result } from '../shared/types/Result.type';

// ✅ Интерфейс для данных из БД (TypeORM Entity)
export interface OrderPersistence {
  id: string;
  customerId: string;
  cakeType: CakeType;
  layers: string[];
  filling: string;
  requestedDate: Date;
  description: string;
  status: OrderStatus;
  makerId: string | null;
  assignedAt: Date | null;
  createdAt: Date;
}

export class Order {
  private constructor(
    private readonly id: Id,
    private readonly customerId: Id,
    private cakeType: CakeType,
    private layers: string[],
    private filling: string,
    private requestedDate: Date,
    private description: string,
    private status: OrderStatus,
    private makerId?: Id,
    private assignedAt?: Date,
    private createdAt: Date = new Date(),
  ) {}

  static create(
    customerId: string,
    cakeType: CakeType,
    layers: string[],
    filling: string,
    requestedDate: Date,
    description: string,
  ): Result<Order> {
    const newIdResult = Id.create();
    if (!newIdResult.success) {
      return { success: false, error: newIdResult.error };
    }
    const newId = newIdResult.data!;

    const customerIdResult = Id.fromString(customerId);
    if (!customerIdResult.success) {
      return {
        success: false,
        error: `Invalid customerId: ${customerIdResult.error}`,
      };
    }

    const CustomerId = customerIdResult.data!;

    const order = new Order(
      newId,
      CustomerId,
      cakeType,
      layers,
      filling,
      requestedDate,
      description,
      OrderStatus.NEW,
    );

    return { success: true, data: order };
  }

  // Геттеры
  getId(): Id {
    return this.id;
  }
  getIdValue(): string {
    return this.id.getValue();
  }
  getCustomerId(): Id {
    return this.customerId;
  }
  getCustomerIdValue(): string {
    return this.customerId.getValue();
  }
  getCakeType(): CakeType {
    return this.cakeType;
  }
  getStatus(): OrderStatus {
    return this.status;
  }
  getMakerId(): Id | undefined {
    return this.makerId;
  }
  getMakerIdValue(): string | undefined {
    return this.makerId?.getValue();
  }
  getRequestedDate(): Date {
    return this.requestedDate;
  }
  getDescription(): string {
    return this.description;
  }
  getLayers(): string[] {
    return this.layers;
  }
  getFilling(): string {
    return this.filling;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
  getAssignedAt(): Date | undefined {
    return this.assignedAt;
  }

  // Бизнес-логика
  isExpired(thresholdHours: number): boolean {
    const now = new Date();
    const diff = now.getTime() - this.createdAt.getTime();
    return diff > thresholdHours * 60 * 60 * 1000;
  }

  assignToMaker(makerId: string): Result<void> {
    if (this.status !== OrderStatus.NEW) {
      return { success: false, error: 'Order already assigned' };
    }

    const makerIdResult = Id.fromString(makerId);
    if (!makerIdResult.success) {
      return {
        success: false,
        error: `Invalid makerId: ${makerIdResult.error}`,
      };
    }

    this.makerId = makerIdResult.data;
    this.status = OrderStatus.ASSIGNED;
    this.assignedAt = new Date();

    return { success: true };
  }

  markAsInProgress(): Result<void> {
    if (this.status !== OrderStatus.ASSIGNED) {
      return { success: false, error: 'Order must be assigned first' };
    }
    this.status = OrderStatus.IN_PROGRESS;
    return { success: true };
  }

  markAsReady(): Result<void> {
    if (this.status !== OrderStatus.IN_PROGRESS) {
      return { success: false, error: 'Order must be in progress' };
    }
    this.status = OrderStatus.READY;
    return { success: true };
  }

  cancel(): Result<void> {
    if (this.status === OrderStatus.COMPLETED) {
      return { success: false, error: 'Cannot cancel completed order' };
    }
    this.status = OrderStatus.CANCELLED;
    return { success: true };
  }

  // Для репозитория
  toPersistence(): OrderPersistence {
    return {
      id: this.id.getValue(),
      customerId: this.customerId.getValue(),
      cakeType: this.cakeType,
      layers: this.layers,
      filling: this.filling,
      requestedDate: this.requestedDate,
      description: this.description,
      status: this.status,
      makerId: this.makerId?.getValue() ?? null,
      assignedAt: this.assignedAt ?? null,
      createdAt: this.createdAt,
    };
  }

  static fromPersistence(data: OrderPersistence): Order {
    return new Order(
      Id.unsafeFromString(data.id),
      Id.unsafeFromString(data.customerId),
      data.cakeType,
      data.layers,
      data.filling,
      data.requestedDate,
      data.description,
      data.status,
      data.makerId ? Id.unsafeFromString(data.makerId) : undefined,
      data.assignedAt ?? undefined,
      data.createdAt,
    );
  }
>>>>>>> 33b11ba (update)
}
