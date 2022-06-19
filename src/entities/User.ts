import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import HistoryReward from './history-reward';

@Entity()
@Unique(['email'])
class User extends BaseEntity {
  static validations = {
    // name: [is.required(), is.maxLength(100)],
  };

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar', { nullable: true })
  firstName: string;

  @Column('varchar', { nullable: true })
  lastName: string;

  @Column('varchar', { nullable: true })
  phoneNumber: string;

  @Column('varchar', { nullable: true })
  avatar: string;

  @Column({
    type: Boolean,
    default: true,
  })
  isActive: boolean;

  @Column({
    type: Boolean,
    default: false,
  })
  isDarkTheme: boolean;

  @Column({
    type: Boolean,
    default: false,
  })
  deleteFlag: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => HistoryReward, (historyReward) => historyReward.userId)
  HistoryReward: HistoryReward[];
}

export default User;
