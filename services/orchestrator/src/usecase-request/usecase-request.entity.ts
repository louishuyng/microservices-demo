import {
  BaseEntity,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Usecase } from '../usecase/usecase.entity';

@Entity()
export class UsecaseRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usecase, (usecase) => usecase.usecaseRequests)
  public usecase: Usecase;
}
