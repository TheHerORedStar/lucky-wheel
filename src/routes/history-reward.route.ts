import { Router } from 'express';
import { HistoryRewardController } from '../controllers';
import { CreateHistoryRewardDto } from '../dtos';
import { Route } from '../interfaces';
import { authMiddleware, validationMiddleware } from '../middlewares';

class HistoryRewardRoute implements Route {
  public path = '/history-reward';
  public router = Router();
  public historyRewardController = new HistoryRewardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authMiddleware,
      this.historyRewardController.getListHistoryReward,
    );

    // CRUD
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(CreateHistoryRewardDto, 'body'),
      this.historyRewardController.createHistoryReward,
    );
    this.router.get(
      `${this.path}/:id`,
      authMiddleware,
      this.historyRewardController.getHistoryReward,
    );
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      this.historyRewardController.updateHistoryReward,
    );
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware,
      this.historyRewardController.deleteHistoryReward,
    );

    this.router.get(
      `${this.path}/list-history-rewards/by-user`,
      authMiddleware,
      this.historyRewardController.getListHistoryRewardByUserId,
    );
    this.router.get(
      `${this.path}/list-history-rewards/by-reward`,
      authMiddleware,
      this.historyRewardController.getListHistoryRewardByRewardId,
    );
  }
}

export default HistoryRewardRoute;
