import { Router } from 'express';
import { UserController } from '../controllers';
import { SignUpDto } from '../dtos/users.dto';
import { Route } from '../interfaces';
import { authMiddleware, validationMiddleware } from '../middlewares';

class UsersRoute implements Route {
  public path = '/users';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.userController.getUsers);
    this.router.get(`${this.path}/:id`, authMiddleware, this.userController.getUserById);
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(SignUpDto, 'body'),
      this.userController.createUser,
    );
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      validationMiddleware(SignUpDto, 'body', true),
      this.userController.updateUser,
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, this.userController.deleteUser);

    this.router.put(
      `${this.path}/change-password/:id`,
      authMiddleware,
      this.userController.changePassword,
    );
    this.router.put(
      `${this.path}/change-password-by-admin/:id`,
      authMiddleware,
      this.userController.changePasswordByAdmin,
    );
    this.router.put(
      `${this.path}/change/dark-theme`,
      authMiddleware,
      this.userController.changeDarkThemeUser,
    );
  }
}

export default UsersRoute;
