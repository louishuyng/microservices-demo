import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Usecase } from '../usecase/usecase.entity';
import { Flow } from '../flow/flow.entity';
import { UsecaseRequest } from '../usecase-request/usecase-request.entity';

@Entity()
export class Logging extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  path: string;

  @Column({ type: 'json' })
  requestBody: JSON;

  @Column({ type: 'json' })
  requestHeader: JSON;

  @Column({ type: 'json' })
  responseBody: JSON;

  @Column({ type: 'json' })
  responseHeader: JSON;

  @Column({ type: 'int' })
  responseStatusCode: number;

  @Column({ type: 'varchar' })
  ipsrc: string;

  @ManyToOne(() => UsecaseRequest, (usecaseRequest) => usecaseRequest.loggings)
  usecaseRequest: UsecaseRequest;

  @ManyToOne(() => Usecase, (usecase) => usecase.loggings)
  usecase: Usecase;

  @ManyToOne(() => Flow, (flow) => flow.loggings)
  flow: Flow;
}
