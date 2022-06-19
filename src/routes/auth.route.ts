import { Router } from 'express';
import { AuthController } from '../controllers';
import { LoginDto, SignUpDto } from '../dtos';
import { Route } from '../interfaces';
import { authMiddleware, validationMiddleware } from '../middlewares';

class AuthRoute implements Route {
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/signup',
      validationMiddleware(SignUpDto, 'body'),
      this.authController.signUp,
    );

    this.router.post('/login', validationMiddleware(LoginDto, 'body'), this.authController.logIn);

    this.router.get('/auth', authMiddleware, this.authController.getCurrentUser);
  }
}

export default AuthRoute;
