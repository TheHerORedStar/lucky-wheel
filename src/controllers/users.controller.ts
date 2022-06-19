import { Request, Response } from 'express';
import { SignUpDto } from '../dtos';
import { RequestWithUser } from '../interfaces';
import { updateUser } from '../interfaces/';
import { UserService } from '../services';
import { HTTP_CODE, MESSAGES, returnResponse, VERSION, comparePassword } from '../utils';
import { User } from '../entities';
class UserController {
  public userService = new UserService();

  public getUsers = async (req: Request, res: Response) => {
    try {
      const { keyword } = req.query;
      const findAllUsersData: User[] = await this.userService.findAllUser(keyword as string);
      return returnResponse({
        res,
        data: findAllUsersData,
        code: HTTP_CODE.OK,
        status: true,
        message: MESSAGES.USER.GET_DATA_SUCCESSFULLY,
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

  public getUserById = async (req: Request, res: Response) => {
    const userId: string = req.params.id;

    try {
      const findOneUserData: User = await this.userService.findUserById(userId);
      return returnResponse({
        res,
        data: findOneUserData,
        code: HTTP_CODE.OK,
        status: true,
        message: MESSAGES.USER.GET_DATA_SUCCESSFULLY,
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

  public createUser = async (req: Request, res: Response) => {
    const userData: SignUpDto = req.body;
    try {
      const createUserData: User = await this.userService.createUser(userData);
      return returnResponse({
        res,
        data: createUserData,
        code: HTTP_CODE.OK,
        status: true,
        message: MESSAGES.USER.CREATED_SUCCESSFULLY,
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
  public updateUser = async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    const userData: updateUser = req.body;

    try {
      const updateUserData: User = await this.userService.updateUser(userId, userData);
      return returnResponse({
        res,
        data: updateUserData,
        code: HTTP_CODE.OK,
        status: true,
        message: MESSAGES.USER.UPDATED_SUCCESSFULLY,
        version: VERSION,
      });
    } catch (error) {
      return returnResponse({
        res,
        data: {},
        code: HTTP_CODE.BAD_REQUEST,
        status: false,
        message: MESSAGES.ERROR,
        version: VERSION,
      });
    }
  };

  public changeDarkThemeUser = async (req: RequestWithUser, res: Response) => {
    const userInfo = req.user;
    const userId: string = userInfo.id;
    const userData: updateUser = req.body;

    try {
      const updateUserData: User = await this.userService.updateUser(userId, userData);
      return returnResponse({
        res,
        data: updateUserData,
        code: HTTP_CODE.OK,
        status: true,
        message: MESSAGES.USER.UPDATED_SUCCESSFULLY,
        version: VERSION,
      });
    } catch (error) {
      return returnResponse({
        res,
        data: {},
        code: HTTP_CODE.BAD_REQUEST,
        status: false,
        message: MESSAGES.USER.NOT_EXIST,
        version: VERSION,
      });
    }
  };

  public deleteUser = async (req: Request, res: Response) => {
    const userId: string = req.params.id;

    try {
      const deleteUserData: User = await this.userService.deleteUserData(userId);
      return returnResponse({
        res,
        data: deleteUserData,
        code: HTTP_CODE.OK,
        status: true,
        message: MESSAGES.USER.DELETED_SUCCESSFULLY,
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

  public changePassword = async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    const { currentPassword, newPassword } = req.body;

    try {
      // Check user's exist
      const userExist = await this.userService.findUserById(userId);
      if (!userExist)
        return returnResponse({
          res,
          data: {},
          code: HTTP_CODE.BAD_REQUEST,
          status: false,
          message: MESSAGES.USER.NOT_EXIST,
          version: VERSION,
        });

      const isPasswordValid = await comparePassword(currentPassword, userExist.password);
      if (!isPasswordValid) {
        return returnResponse({
          res,
          data: {},
          code: HTTP_CODE.BAD_REQUEST,
          status: false,
          message: MESSAGES.AUTHENTICATION.PASSWORD_NOT_MATCH,
          version: VERSION,
        });
      }

      await this.userService.changePassword(userId, newPassword);

      return returnResponse({
        res,
        data: {},
        code: HTTP_CODE.OK,
        status: true,
        message: MESSAGES.USER.CHANGE_PASSWORD_SUCCESS,
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

  public changePasswordByAdmin = async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    const { newPassword } = req.body;

    try {
      // Check user's exist
      const userExist = await this.userService.findUserById(userId);
      if (!userExist)
        return returnResponse({
          res,
          data: {},
          code: HTTP_CODE.BAD_REQUEST,
          status: false,
          message: MESSAGES.USER.NOT_EXIST,
          version: VERSION,
        });

      await this.userService.changePassword(userId, newPassword);

      return returnResponse({
        res,
        data: {},
        code: HTTP_CODE.OK,
        status: true,
        message: MESSAGES.USER.CHANGE_PASSWORD_SUCCESS,
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

export default UserController;
