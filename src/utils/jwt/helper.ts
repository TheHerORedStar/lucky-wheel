import { sign, SignOptions, verify } from 'jsonwebtoken';

export const generateToken = (
  payload: {
    id: string;
  },
  options: SignOptions,
) =>
  new Promise((resolve, reject) => {
    sign(payload, process.env.SECRET, options || { noTimestamp: true }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });

export const generateRefreshToken = (
  payload: {
    id: string;
  },
  options: SignOptions,
) =>
  new Promise((resolve, reject) => {
    sign(payload, process.env.REFRESH_SECRET, options || { noTimestamp: true }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });

export const verifyToken = (token: string) =>
  new Promise((resolve, reject) => {
    verify(token, process.env.SECRET, (err, decoded: { id: string }) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });

export const verifyRefreshToken = (refreshToken: string): Promise<string> =>
  new Promise((resolve, reject) => {
    verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded: { id: string }) => {
      if (err) {
        reject(err);
      } else {
        const userId: string = decoded.id;
        resolve(userId);
      }
    });
  });
