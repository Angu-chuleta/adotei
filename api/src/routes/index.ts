import { Router } from 'express';
import auth from './auth';
import pet from './pet';
import user from './ong';
import utilsRoutes from './utils.routes';

const routes = Router();

routes.use(auth);
routes.use(utilsRoutes);
routes.use(pet);
routes.use(user);

export default routes;
