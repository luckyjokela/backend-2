<<<<<<< HEAD
// id,
// customerId,
// makerId (кто взял),
// status (new, in_progress, done)
// cakeType,
// layers,
// filling,
// date
// createdAt
=======
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderStatus } from '../../../../core/entities/variableObjects/OrderStatus.enum';
import { CakeType } from '../../../../core/entities/variableObjects/CakeType.enum';
import { UserEntity } from './UserEntity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  customerId!: string;

  @Column({ type: 'text', enum: CakeType })
  cakeType!: CakeType;

  @Column('text', { array: true })
  layers!: string[];

  @Column('text')
  filling!: string;

  @Column({ type: 'timestamptz' })
  requestedDate!: Date;

  @Column('text', { nullable: true })
  description!: string;

  @Column({ type: 'text', enum: OrderStatus, default: OrderStatus.NEW })
  status!: OrderStatus;

  @Column({ type: 'uuid', nullable: true })
  makerId!: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  assignedAt!: Date | null;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @ManyToOne(() => UserEntity, { eager: false })
  @JoinColumn({ name: 'customerId' })
  customer!: UserEntity;

  @ManyToOne(() => UserEntity, { eager: false })
  @JoinColumn({ name: 'makerId' })
  maker?: UserEntity;
}
>>>>>>> 33b11ba (update)
