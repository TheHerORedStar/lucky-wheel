import bcrypt from 'bcrypt';
import request from 'supertest';
import App from '../app';
import AuthRoute from '../routes/auth.route';
import { SignUpDto, LoginDto } from '../dtos';
import HttpException from '../exceptions/HttpException';
import { TokenData } from '../interfaces';
import AuthService from '../services/auth.service';

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
});

describe('Testing AuthController', () => {
  describe('POST /signup', () => {
    it('response should have the Create userData', () => {
      const userData: SignUpDto = {
        email: 'test@gmail.com',
        password: 'A1bq1w2e3r4!',
        lastName: 'tuan',
        firstName: 'hung',
      };

      const authRoute = new AuthRoute();

      authRoute.authController.authService.userEntity.findOne = jest
        .fn()
        .mockReturnValue(Promise.resolve(undefined));

      authRoute.authController.authService.userEntity.create = jest
        .fn()
        .mockReturnValue({ ...userData });

      const app = new App([authRoute]);

      return request(app.getServer()).post('/signup').send(userData);
    });
  });

  describe('POST /login', () => {
    it('response should have the Set-Cookie header with the Authorization token', async () => {
      const userData: LoginDto = {
        email: 'test@gmail.com',
        password: 'A1bq1w2e3r4!',
      };

      const authRoute = new AuthRoute();

      authRoute.authController.authService.userEntity.findOne = jest.fn().mockReturnValue(
        Promise.resolve({
          email: 'test@email.com',
          password: await bcrypt.hash(userData.password, 10),
        }),
      );

      const app = new App([authRoute]);
      return request(app.getServer())
        .post('/login')
        .send(userData)
        .expect('Set-Cookie', /^Authorization=.+/);
    });
  });
});

describe('Testing AuthService', () => {
  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const tokenData: TokenData = {
        token: '',
        expiresIn: 1,
      };

      const authService = new AuthService();

      expect(typeof authService.createCookie(tokenData)).toEqual('string');
    });
  });

  describe('when registering a user', () => {
    describe('if the email is already token', () => {
      it('should throw an error', async () => {
        const userData: SignUpDto = {
          email: 'test@gmail.com',
          password: 'A1bq1w2e3r4!',
          lastName: 'tuan',
          firstName: 'hung',
        };

        const authService = new AuthService();

        authService.userEntity.findOne = jest.fn().mockReturnValue(Promise.resolve(userData));

        await expect(authService.signup(userData)).rejects.toMatchObject(
          new HttpException(400, `User with email ${userData.email} already exists`),
        );
      });
    });

    describe('if the email is not token', () => {
      it('should not throw an error', async () => {
        const userData: SignUpDto = {
          email: 'test@email.com',
          password: 'q1w2e3r4!',
          lastName: 'tuan',
          firstName: 'hung',
        };

        const authService = new AuthService();

        authService.userEntity.findOne = jest.fn().mockReturnValue(Promise.resolve(undefined));

        authService.userEntity.create = jest.fn().mockReturnValue({ ...userData });

        await expect(authService.signup(userData)).resolves.toBeDefined();
      });
    });
  });
});
