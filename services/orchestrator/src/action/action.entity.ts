import { ActionRequest } from '../action-request/action-request.entity';
import { Flow } from '../flow/flow.entity';
import { Service } from '../service/service.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

@Entity()
export class Action extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  apiPath: string;

  @Column({ type: 'enum', enum: RequestMethod })
  requestMethod: RequestMethod;

  @Column()
  serviceId: number;

  @ManyToOne(() => Service, (service) => service.actions, {
    cascade: true,
  })
  @JoinColumn()
  service: Service;

  @OneToMany(() => Flow, (flow) => flow.action)
  flows: Flow[];

  @OneToMany(() => ActionRequest, (actionRequest) => actionRequest.action)
  requests: ActionRequest[];
}
