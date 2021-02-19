import { Router } from 'express';
import { userController } from '../controllers';
import { checkJwt } from '../middlewares';

const routes = Router();

routes.get('/user', [checkJwt], userController.getAll);
routes.get('/user/:id', [checkJwt], userController.getOne);
export default routes;
