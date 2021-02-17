import { Router } from 'express';
import utilsRoutes from './utils.routes';
import pet from './pet';
import institution from './institution';
import user from './user';

const routes = Router();

routes.use(utilsRoutes);
routes.use(pet);
routes.use(institution);
routes.use(user);

export default routes;
