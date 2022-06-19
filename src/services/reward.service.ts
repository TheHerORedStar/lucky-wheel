import { Reward } from '../entities';
import { CreateRewardDto } from '../dtos';
import { Like, Not } from 'typeorm';

import { createEntity, deleteEntity, findEntityOrThrow, updateEntity } from '../utils/typeorm';

class RewardService {
  public rewards = Reward;

  public async getListReward(): Promise<Reward[]> {
    const rewards: Reward[] = await this.rewards.find();
    return rewards;
  }

  public async checkExistReward(name?: string, RewardId?: string): Promise<Reward> {
    let findReward: Reward;
    if (!RewardId) {
      findReward = await this.rewards.findOne({
        where: {
          name: name,
          deleteFlag: false,
        },
      });
    } else {
      findReward = await this.rewards.findOne({
        where: {
          id: Not(RewardId),
          name: name,
          deleteFlag: false,
        },
      });
    }
    return findReward;
  }

  // CRUD
  public async createReward(RewardData: CreateRewardDto): Promise<Reward> {
    const createData: Reward = await await createEntity(this.rewards, RewardData);
    return createData;
  }

  public async getRewardById(RewardId: string): Promise<Reward> {
    const rewards: Reward = await findEntityOrThrow(this.rewards, RewardId);
    return rewards;
  }

  public async updateReward(RewardId: string, RewardData: Reward): Promise<Reward> {
    const updateRewardById = await updateEntity(this.rewards, RewardId, RewardData);
    return updateRewardById;
  }

  public async deleteReward(RewardId: string) {
    const deleteRewardById: Reward = await deleteEntity(this.rewards, RewardId);
    return deleteRewardById;
  }
}

export default RewardService;
