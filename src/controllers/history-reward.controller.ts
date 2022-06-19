import { Request, Response } from 'express';
import { RequestWithUser } from '../interfaces';
import { HistoryReward } from '../entities';

import { HistoryRewardService } from '../services';
import { MESSAGES, returnResponse, VERSION, HTTP_CODE } from '../utils';

class HistoryRewardController {
  public historyRewardService: HistoryRewardService = new HistoryRewardService();

  public getListHistoryReward = async (req: Request, res: Response) => {
    try {
      const HistoryRewards: HistoryReward[] =
        await this.historyRewardService.getListHistoryReward();
      return returnResponse({
        res,
        data: HistoryRewards,
        code: HTTP_CODE.OK,
        status: true,
        message: MESSAGES.HISTORY_REWARD.GET_DATA_SUCCESSFULLY,
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

  public getListHistoryRewardByUserId = async (req: Request, res: Response) => {
    try {
      const { userId } = req.query;
      const HistoryRewards: HistoryReward[] =
        await this.historyRewardService.getListHistoryRewardByUserId(userId as string);
      return returnResponse({
        res,
        data: HistoryRewards,
        code: HTTP_CODE.OK,
        status: true,
        message: MESSAGES.HISTORY_REWARD.GET_DATA_SUCCESSFULLY,
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

  public getListHistoryRewardByRewardId = async (req: Request, res: Response) => {
    try {
      const { rewardId } = req.query;
      const HistoryRewards: HistoryReward[] =
        await this.historyRewardService.getListHistoryRewardByRewardId(rewardId as string);
      return returnResponse({
        res,
        data: HistoryRewards,
        code: HTTP_CODE.OK,
        status: true,
        message: MESSAGES.HISTORY_REWARD.GET_DATA_SUCCESSFULLY,
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

  public createHistoryReward = async (req: Request, res: Response) => {
    const HistoryRewardData: HistoryReward = req.body;
    try {
      const createHistoryRewardData: HistoryReward =
        await this.historyRewardService.createHistoryReward(HistoryRewardData);

      return returnResponse({
        res,
        data: createHistoryRewardData,
        code: HTTP_CODE.OK,
        status: true,
        message: MESSAGES.HISTORY_REWARD.CREATED_SUCCESSFULLY,
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

  public getHistoryReward = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const HistoryReward: HistoryReward = await this.historyRewardService.getHistoryRewardById(id);
      return returnResponse({
        res,
        data: HistoryReward,
        code: HTTP_CODE.OK,
        status: true,
        message: MESSAGES.HISTORY_REWARD.GET_DATA_SUCCESSFULLY,
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

  public updateHistoryReward = async (req: RequestWithUser, res: Response) => {
    const HistoryRewardId: string = req.params.id;
    const HistoryRewardData: HistoryReward = req.body;
    try {
      const updateHistoryRewardData: HistoryReward =
        await this.historyRewardService.updateHistoryReward(HistoryRewardId, HistoryRewardData);
      return returnResponse({
        res,
        data: updateHistoryRewardData,
        code: HTTP_CODE.OK,
        status: true,
        message: MESSAGES.HISTORY_REWARD.UPDATED_SUCCESSFULLY,
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

  public deleteHistoryReward = async (req: RequestWithUser, res: Response) => {
    const HistoryRewardId: string = req.params.id;
    try {
      const HistoryRewardDelete = await this.historyRewardService.deleteHistoryReward(
        HistoryRewardId,
      );
      return returnResponse({
        res,
        data: HistoryRewardDelete,
        code: HTTP_CODE.OK,
        status: true,
        message: MESSAGES.HISTORY_REWARD.DELETED_SUCCESSFULLY,
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

export default HistoryRewardController;
