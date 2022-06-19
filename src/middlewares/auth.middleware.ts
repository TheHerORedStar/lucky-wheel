import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '../interfaces';
import { User } from '../entities';
import { isEmpty } from '../utils';
import { findEntityOrThrow } from '../utils/typeorm';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization as string;
    if (!isEmpty(authorization) && authorization.match(/^Bearer /g)) {
      const token = authorization.split(' ')[1];
      const secret = process.env.JWT_SECRET;
      const verificationResponse = (await jwt.verify(token, secret)) as DataStoredInToken;

      const userId = verificationResponse.id;
      const findUser: User = await findEntityOrThrow(User, userId);

      if (findUser && findUser.isActive == true) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
