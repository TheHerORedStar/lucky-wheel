import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import HistoryReward from './history-reward';

import is from '../utils/validation';
@Entity()
@Unique(['name'])
class Reward extends BaseEntity {
  static validations = {
    name: [is.required(), is.maxLength(100)],
  };

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('float', { nullable: true })
  scale: number;

  @Column('float', { nullable: true })
  maxItem: number;

  @Column({
    type: Boolean,
    default: false,
  })
  deleteFlag: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => HistoryReward, (historyReward) => historyReward.rewardId)
  HistoryReward: HistoryReward[];
}

export default Reward;
