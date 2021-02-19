import { Router } from 'express';
import { petController } from '../controllers';
import { checkJwt } from '../middlewares';

const routes = Router();

routes.get('/pet', petController.getAll);
routes.get('/pet/:id', petController.getOne);
routes.put('/pet/:id', petController.update);
routes.delete('/pet/:id', petController.delete);
routes.post('/pet', petController.create);
routes.get('/my-pets', [checkJwt], petController.myPets);

export default routes;
