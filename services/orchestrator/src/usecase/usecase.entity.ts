import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Logging } from '../logging/logging.entity';
import { UsecaseRequest } from '../usecase-request/usecase-request.entity';
import { Flow } from '../flow/flow.entity';

@Entity()
@Unique(['key'])
export class Usecase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  key: string;

  @OneToMany(() => Flow, (flow) => flow.usecase)
  flows: Flow[];

  @OneToMany(() => UsecaseRequest, (usecaseRequest) => usecaseRequest.usecase)
  usecaseRequests: UsecaseRequest[];

  @OneToMany(() => Logging, (logging) => logging.usecase)
  loggings: Logging[];
}
