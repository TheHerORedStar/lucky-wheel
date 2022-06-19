import { Router } from 'express';
import { RewardController } from '../controllers';
import { CreateRewardDto } from '../dtos';
import { Route } from '../interfaces';
import { authMiddleware, validationMiddleware } from '../middlewares';

class RewardRoute implements Route {
  public path = '/reward';
  public router = Router();
  public rewardController = new RewardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.rewardController.getListReward);

    // CRUD
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(CreateRewardDto, 'body'),
      this.rewardController.createReward,
    );
    this.router.get(`${this.path}/:id`, authMiddleware, this.rewardController.getReward);
    this.router.put(`${this.path}/:id`, authMiddleware, this.rewardController.updateReward);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.rewardController.deleteReward);
  }
}

export default RewardRoute;
