import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from '@routes';
import { connectDb } from './config';

export default class RestApi {
  private app: Express;

  constructor() {
    this.app = express();
    this.configureGlobalHandlers();
    this.configureRoutes();
  }

  get expressApp(): Express {
    return this.app;
  }

  listen(port: number = 3000): void {
    // eslint-disable-next-line no-console
    this.app.listen(port, console.log.bind(console, `REST Api started on port ${port}`));
  }

  private configureGlobalHandlers(): void {
    connectDb();
    this.app.use('/', express.static('/public'));
    this.app.use('/docs', express.static('/docs'));
    this.app.use(helmet());
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(cors());
  }

  private configureRoutes(): void {
    this.app.use(routes);
  }
}
