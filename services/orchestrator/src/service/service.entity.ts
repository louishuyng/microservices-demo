import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Action } from '../action/action.entity';

export enum HealthyState {
  NO_DATA = 'no_data',
  HEALTHY = 'healthy',
  UNHEALTHY = 'unhealthy',
}

@Entity()
@Unique(['name'])
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  host: string;

  @Column({ type: 'int', nullable: true })
  port: number;

  @Column({ type: 'enum', enum: HealthyState, default: HealthyState.NO_DATA })
  healthyState: HealthyState;

  @Column({ type: 'varchar', default: '/healthy' })
  heathyPath: string;

  @OneToMany(() => Action, (action) => action.service)
  actions: Action[];
}
