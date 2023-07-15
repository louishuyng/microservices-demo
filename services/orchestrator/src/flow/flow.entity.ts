import {
  BaseEntity,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Action } from '../action/action.entity';
import { Usecase } from '../usecase/usecase.entity';
import { Logging } from '../logging/logging.entity';

@Entity()
export class Flow extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usecase, (usecase) => usecase.flows)
  public usecase: Usecase;

  @ManyToOne(() => Action, (action) => action.flows)
  public action: Action;

  @OneToMany(() => Logging, (logging) => logging.flow)
  loggings: Logging[];
}
