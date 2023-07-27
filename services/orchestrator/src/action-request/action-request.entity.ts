import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Action } from '../action/action.entity';

@Entity()
export class ActionRequest extends BaseEntity {
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

  @ManyToOne(() => Action, (action) => action.requests)
  action: Action;
}
