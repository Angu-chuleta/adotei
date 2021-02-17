import { Router } from 'express';
import utilsRoutes from './utils.routes';
import pet from './pet';
import institution from './institution';

const routes = Router();

routes.use(utilsRoutes);
routes.use(pet);
routes.use(institution);

export default routes;
