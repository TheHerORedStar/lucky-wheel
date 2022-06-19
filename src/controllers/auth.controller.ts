import { Request, Response } from 'express';
import { LoginDto, SignUpDto } from '../dtos';
import { AuthService } from '../services';
import { RequestWithUser } from '../interfaces';
import { User } from '../entities';
import { MESSAGES, returnResponse, VERSION, HTTP_CODE } from '../utils';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response) => {
    const userData: SignUpDto = req.body;

    try {
      const signUpUserData: User = await this.authService.signup(userData);
      return returnResponse({
        res,
        data: signUpUserData,
        code: HTTP_CODE.OK,
        status: true,
        message: MESSAGES.SUCCESS,
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

  public logIn = async (req: Request, res: Response) => {
    const userData: LoginDto = req.body;
    try {
      const { token, findUser } = await this.authService.login(userData);
      return returnResponse({
        res,
        data: { inforUser: findUser, token },
        code: HTTP_CODE.OK,
        status: true,
        message: MESSAGES.SUCCESS,
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

  public getCurrentUser = async (req: RequestWithUser, res: Response) => {
    const userData: User = req.user;
    try {
      return returnResponse({
        res,
        data: userData,
        code: HTTP_CODE.OK,
        status: true,
        message: MESSAGES.SUCCESS,
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

export default AuthController;
