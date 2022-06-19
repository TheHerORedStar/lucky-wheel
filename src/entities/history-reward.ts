import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import User from './User';
import Reward from './reward';

@Entity()
class HistoryReward extends BaseEntity {
  static validations = {
    // name: [is.required(), is.maxLength(100)],
  };

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.HistoryReward)
  @JoinColumn({ name: 'userId' })
  userId: string;

  @ManyToOne(() => Reward, (reward) => reward.HistoryReward)
  @JoinColumn({ name: 'rewardId' })
  rewardId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export default HistoryReward;
