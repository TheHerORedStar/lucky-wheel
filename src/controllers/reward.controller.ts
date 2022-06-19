import { Request, Response } from 'express';
import { CreateRewardDto } from '../dtos';
import { RequestWithUser } from '../interfaces';
import { Reward } from '../entities';

import { RewardService } from '../services';
import { MESSAGES, returnResponse, VERSION, HTTP_CODE } from '../utils';

class RewardController {
  public rewardService: RewardService = new RewardService();

  public getListReward = async (req: Request, res: Response) => {
    try {
      const Rewards: Reward[] = await this.rewardService.getListReward();
      return returnResponse({
        res,
        data: Rewards,
        code: HTTP_CODE.OK,
        status: true,
        message: MESSAGES.REWARD.GET_DATA_SUCCESSFULLY,
        version: VERSION,
      });
    } catch (error) {
      return returnResponse({
        res,
        data: {},
        code: error.code,
        status: false,
        message: error.message,
        version: VERSION,
      });
    }
  };

  public createReward = async (req: Request, res: Response) => {
    const RewardData: CreateRewardDto = req.body;
    try {
      const getRewardByName: Reward = await this.rewardService.checkExistReward(RewardData.name);
      if (getRewardByName) {
        return returnResponse({
          res,
          data: {},
          code: HTTP_CODE.BAD_REQUEST,
          status: false,
          message: MESSAGES.REWARD.EXISTED,
          version: VERSION,
        });
      }

      const createRewardData: Reward = await this.rewardService.createReward(RewardData);

      return returnResponse({
        res,
        data: createRewardData,
        code: HTTP_CODE.OK,
        status: true,
        message: MESSAGES.REWARD.CREATED_SUCCESSFULLY,
        version: VERSION,
      });
    } catch (error) {
      return returnResponse({
        res,
        data: {},
        code: error.code,
        status: false,
        message: error.message,
        version: VERSION,
      });
    }
  };

  public getReward = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const Reward: Reward = await this.rewardService.getRewardById(id);
      return returnResponse({
        res,
        data: Reward,
        code: HTTP_CODE.OK,
        status: true,
        message: MESSAGES.REWARD.GET_DATA_SUCCESSFULLY,
        version: VERSION,
      });
    } catch (error) {
      return returnResponse({
        res,
        data: {},
        code: error.code,
        status: false,
        message: error.message,
        version: VERSION,
      });
    }
  };

  public updateReward = async (req: RequestWithUser, res: Response) => {
    const RewardId: string = req.params.id;
    const RewardData: Reward = req.body;
    try {
      const getRewardByName: Reward = await this.rewardService.checkExistReward(
        RewardData.name,
        RewardId,
      );
      if (getRewardByName) {
        return returnResponse({
          res,
          data: {},
          code: HTTP_CODE.BAD_REQUEST,
          status: false,
          message: MESSAGES.REWARD.EXISTED,
          version: VERSION,
        });
      }
      const updateRewardData: Reward = await this.rewardService.updateReward(RewardId, RewardData);
      return returnResponse({
        res,
        data: updateRewardData,
        code: HTTP_CODE.OK,
        status: true,
        message: MESSAGES.REWARD.UPDATED_SUCCESSFULLY,
        version: VERSION,
      });
    } catch (error) {
      return returnResponse({
        res,
        data: {},
        code: error.code,
        status: false,
        message: error.message,
        version: VERSION,
      });
    }
  };

  public deleteReward = async (req: RequestWithUser, res: Response) => {
    const RewardId: string = req.params.id;
    try {
      const RewardDelete = await this.rewardService.deleteReward(RewardId);
      return returnResponse({
        res,
        data: RewardDelete,
        code: HTTP_CODE.OK,
        status: true,
        message: MESSAGES.REWARD.DELETED_SUCCESSFULLY,
        version: VERSION,
      });
    } catch (error) {
      return returnResponse({
        res,
        data: {},
        code: error.code,
        status: false,
        message: error.message,
        version: VERSION,
      });
    }
  };
}

export default RewardController;
