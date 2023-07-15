import { Flow } from '../flow/flow.entity';
import { Service } from '../service/service.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Action extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  apiPath: string;

  @ManyToOne(() => Service, (service) => service.actions)
  service: Service;

  @OneToMany(() => Flow, (flow) => flow.action)
  flows: Flow[];
}