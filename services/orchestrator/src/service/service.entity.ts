import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Action } from '../action/action.entity';

export enum HealthState {
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

  @Column({ type: 'enum', enum: HealthState, default: HealthState.NO_DATA })
  healthState: HealthState;

  @Column({ type: 'varchar', default: '/health' })
  heathPath: string;

  @OneToMany(() => Action, (action) => action.service)
  actions: Action[];

  public get healthCheckUrl(): string {
    return `${this.serviceUrl}${this.heathPath}`;
  }

  public get serviceUrl(): string {
    if (!this.port) {
      return `http://${this.host}`;
    }

    return `http://${this.host}:${this.port}`;
  }
}
