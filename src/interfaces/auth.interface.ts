import { Request } from 'express';
import { User } from '../entities';

export interface DataStoredInToken {
  id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  headers: any;
  params: any;
  body: any;
  user: User;
}

export interface RequestWithUpload extends Request {
  files: any;
}
