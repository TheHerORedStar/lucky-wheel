import { Response } from 'express';

interface ResponseDTO {
  status: boolean;
  code: number;
  message: string;
  data: unknown;
  version: string;
  detail?: string;
}

export const returnResponse = (response: {
  res: Response;
  status?: boolean;
  code: number;
  message: string;
  data: unknown;
  version: string;
  detail?: string;
}) => {
  const { res, status, code, message, data, version, detail } = response;
  const responseDto: ResponseDTO = {
    status,
    code,
    message,
    data,
    version,
    detail,
  };

  if (responseDto.code >= 100 && responseDto.code <= 600) {
    return res.status(responseDto.code).send(responseDto);
  }
  return res.status(500).send(responseDto);
};
