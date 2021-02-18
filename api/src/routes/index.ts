import { Router } from 'express';
import auth from './auth';
import institution from './institution';
import pet from './pet';
import user from './user';
import utilsRoutes from './utils.routes';

const routes = Router();

routes.use(auth);
routes.use(utilsRoutes);
routes.use(pet);
routes.use(institution);
routes.use(user);

export default routes;
