import { Router } from 'express';
import utilsRoutes from './utils.routes';
import pet from './pet';

const routes = Router();

routes.use(utilsRoutes);
routes.use(pet);

export default routes;
