import * as multer from 'multer';
import { promisify } from 'util';
import { parse } from 'path';
import { Request } from 'express';
global.__dirname = __dirname;

const maxSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
  destination(req: Request, file: any, cb: any) {
    if (file) {
      cb(null, __dirname + './public/uploads/');
    }
  },
  filename(req: Request, file: any, cb: any) {
    if (file) {
      const fileName = parse(file.originalname).name;
      const originalArr = file.originalname.split('.');
      const ext = originalArr[originalArr.length - 1];
      const uniqueSuffix = `${Date.now()}`;
      cb(null, `${fileName}-${uniqueSuffix}.${ext}`);
    }
  },
});

const upload = multer({
  storage,
  limits: { fileSize: maxSize },
});
const uploadMiddleware = () => promisify(upload.single('file'));
export default uploadMiddleware;
