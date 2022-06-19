import { compare, hashSync, genSaltSync } from 'bcryptjs';

const hashPassword = (text: string) => hashSync(text, genSaltSync(12));

const comparePassword = (text: string, encrypted: string) =>
  new Promise((resolve, reject) => {
    compare(text, encrypted, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });

export { hashPassword, comparePassword };
