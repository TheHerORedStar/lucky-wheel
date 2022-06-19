import { HistoryReward } from '../entities';
import { CreateHistoryRewardDto } from '../dtos';
import { Like, Not } from 'typeorm';

import { createEntity, deleteEntity, findEntityOrThrow, updateEntity } from '../utils/typeorm';

class HistoryRewardservice {
  public historyRewards = HistoryReward;

  public async getListHistoryReward(): Promise<HistoryReward[]> {
    const historyRewards: HistoryReward[] = await this.historyRewards.find({
      loadRelationIds: true,
    });
    return historyRewards;
  }

  public async getListHistoryRewardByUserId(userId: string): Promise<HistoryReward[]> {
    const historyRewards: HistoryReward[] = await this.historyRewards.find({
      relations: ['rewardId'],
      where: {
        userId: userId,
      },
    });
    return historyRewards;
  }

  public async getListHistoryRewardByRewardId(rewardId: string): Promise<HistoryReward[]> {
    const historyRewards: HistoryReward[] = await this.historyRewards.find({
      relations: ['userId'],
      where: {
        rewardId: rewardId,
      },
    });
    return historyRewards;
  }

  public async checkExistHistoryReward(HistoryRewardId?: string): Promise<HistoryReward> {
    let findHistoryReward: HistoryReward;
    if (!HistoryRewardId) {
      findHistoryReward = await this.historyRewards.findOne({});
    } else {
      findHistoryReward = await this.historyRewards.findOne({
        where: {
          id: Not(HistoryRewardId),
        },
      });
    }
    return findHistoryReward;
  }

  // CRUD
  public async createHistoryReward(HistoryRewardData: HistoryReward): Promise<HistoryReward> {
    const createData: HistoryReward = await createEntity(this.historyRewards, HistoryRewardData);
    return createData;
  }

  public async getHistoryRewardById(HistoryRewardId: string): Promise<HistoryReward> {
    const historyRewards: HistoryReward = await findEntityOrThrow(
      this.historyRewards,
      HistoryRewardId,
    );
    return historyRewards;
  }

  public async updateHistoryReward(
    HistoryRewardId: string,
    HistoryRewardData: HistoryReward,
  ): Promise<HistoryReward> {
    const updateHistoryRewardById = await updateEntity(
      this.historyRewards,
      HistoryRewardId,
      HistoryRewardData,
    );
    return updateHistoryRewardById;
  }

  public async deleteHistoryReward(HistoryRewardId: string) {
    const deleteHistoryRewardById: HistoryReward = await deleteEntity(
      this.historyRewards,
      HistoryRewardId,
    );
    return deleteHistoryRewardById;
  }
}

export default HistoryRewardservice;
