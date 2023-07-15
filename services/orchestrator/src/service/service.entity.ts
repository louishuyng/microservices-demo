import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Action } from '../action/action.entity';

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

  @OneToMany(() => Action, (action) => action.service)
  actions: Action[];
}
