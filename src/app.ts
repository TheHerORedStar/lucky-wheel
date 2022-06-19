import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import fileupload from 'express-fileupload';

import { set } from 'mongoose';
import { Route } from './interfaces';
import { errorMiddleware } from './middlewares';
import { logger, stream, config } from './utils';
import { AuthService } from './services';
import { PostgresSQLConnection } from './database';

class App {
  public app: express.Application;
  public port: number;
  public env: string;
  public AuthService: AuthService = new AuthService();

  constructor(routes: Route[]) {
    this.app = express();
    this.env = process.env.NODE_ENV;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initialzieDefaultApp();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.port = parseInt(config.PORT.toString()) || 8601;
    this.app.listen(this.port, '0.0.0.0', () => {
      logger.info(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    if (this.env !== 'prod') {
      set('debug', true);
    }

    PostgresSQLConnection()
      .then(() => {
        logger.info('🟢 The PostgresSQL is connected.');
      })
      .catch((error) => {
        logger.error(`🔴 Unable to connect to the PostgresSQL: ${error}.`);
      });
  }

  private initializeMiddlewares() {
    if (this.env === 'prod') {
      this.app.use(morgan('combined', { stream }));
      this.app.use(cors({ origin: 'your.domain.com', credentials: true }));
    } else if (this.env === 'dev') {
      this.app.use(morgan('dev', { stream }));
      this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(
      fileupload({
        limits: { fileSize: 50 * 1024 * 1024 },
      }),
    );
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use('/api/v1', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        openapi: '3.0.1',
        info: {
          title: ' API',
          version: '1.0.0',
          description: 'API definition',
          contact: {
            email: 'admin@gmail.com',
          },
        },
        servers: [
          {
            description: ' API Local',
            url: 'http://localhost:8601/api/v1',
          },
          {
            description: ' API Dev',
            url: 'http://localhost:8601/api/v1',
          },
          {
            description: ' API Prod',
            url: 'http://localhost:8601/api/v1',
          },
        ],
      },

      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
  private initialzieDefaultApp() {
    const auth = new AuthService();
    auth.createInitiateApplication();
  }
}

export default App;
