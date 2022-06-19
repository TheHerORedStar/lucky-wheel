import { Types } from 'mongoose';
import { returnResponse } from '../response-handler';
import { HTTP_CODE } from '../http-code';
import { VERSION } from '../version';

export const validateObjectId = (ObjectId, ObjectIdName, res) => {
  if (!Types.ObjectId.isValid(ObjectId)) {
    return returnResponse({
      res,
      data: {},
      code: HTTP_CODE.BAD_REQUEST,
      status: false,
      message: `${ObjectIdName} must be ObjectId.`,
      version: VERSION,
    });
  }
};
