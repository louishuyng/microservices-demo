import {
  BaseEntity,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Action } from '../action/action.entity';
import { Usecase } from '../usecase/usecase.entity';

@Entity()
export class Flow extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usecase, (usecase) => usecase.flows)
  public usecase: Usecase;

  @ManyToOne(() => Action, (action) => action.flows)
  public action: Action;
}
