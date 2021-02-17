import { Router } from 'express';
import { userController } from '../controllers';
// import { checkJwt } from '../middlewares/auth.middleware';

const routes = Router();

/**
 * @swagger
 *
 * /user:
 *   get:
 *     description: get a user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: login
 */
routes.get('/user', [/* checkJwt */], userController.getAll);
/**
 * @swagger
 *
 * /user/:id:
 *   get:
 *     description: user
 *     produces:
 *       - application/jsong
 *     responses:
 *       200:
 *         description: user
 */
routes.get('/user/:id', [/* checkJwt */], userController.getOne);
/**
 * @swagger
 *
 * /user/:id/addcredit:
 *   put:
 *     description: add credit to user
 *     produces:
 *       - application/jsong
 *     parameters:

 *       - name: credito
 *         description: credito que será adicionado
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: user
 */
routes.post('/user/:id/addcredit', [/* checkJwt */], userController.addCredit);
export default routes;
