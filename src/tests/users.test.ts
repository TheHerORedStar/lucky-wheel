import request from 'supertest';
import App from '../app';
import UsersRoute from '../routes/users.route';

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
});

describe('Testing Users', () => {
  describe('GET /users', () => {
    it('response All Users', () => {
      const usersRoute = new UsersRoute();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}`).expect(200);
    });
  });
});
