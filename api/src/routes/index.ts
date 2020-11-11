import { Router } from 'express';
import utilsRoutes from './utils.routes';

const routes = Router();

routes.use(utilsRoutes);

export default routes;
