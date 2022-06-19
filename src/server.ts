import 'dotenv/config';
import App from './app';
import { AuthRoute, UsersRoute, HistoryRewardRoute, RewardRoute } from './routes';
import { validateEnv } from './utils';

validateEnv();

const app = new App([
  new UsersRoute(),
  new AuthRoute(),
  new HistoryRewardRoute(),
  new RewardRoute(),
]);

app.listen();

process.on('uncaughtExceptionMonitor', (...args) => {
  console.log(args);
});

process.on('uncaughtException', (...args) => {
  console.log(args);
});

process.on('exit', (...args) => {
  console.log(args);
});

process.on('beforeExit', (...args) => {
  console.log(args);
});

process.on('rejectionHandled', (...args) => {
  console.log(args);
});

process.on('warning', (...args) => {
  console.log(args);
});
