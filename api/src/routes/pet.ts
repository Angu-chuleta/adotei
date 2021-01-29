import { Router } from 'express';
import { petController } from '../controllers';

const routes = Router();

/**
 * @swagger
 *
 * /pet:
 *   get:
 *     description: pet
 *     produces:
 *       - application/jsong
 *     responses:
 *       200:
 *         description: pet
 */
routes.get('/pet', petController.getAll);
/**
 * @swagger
 *
 * /pet/:id:
 *   get:
 *     description: pet
 *     produces:
 *       - application/jsong
 *     responses:
 *       200:
 *         description: pet
 */
routes.get('/pet/:id', petController.getOne);
/**
 * @swagger
 *
 * /pet/:id:
 *   put:
 *     description: pet
 *     produces:
 *       - application/jsong
 *     responses:
 *       200:
 *         description: pet
 */
routes.put('/pet/:id', petController.update);
/**
 * @swagger
 *
 * /pet/:id:
 *   delete:
 *     description: pet
 *     produces:
 *       - application/jsong
 *     responses:
 *       200:
 *         description: pet
 */
routes.delete('/pet/:id', petController.delete);
/**
 * @swagger
 *
 * /pet:
 *   post:
 *     description: pet
 *     produces:
 *       - application/jsong
 *     responses:
 *       200:
 *         description: pet
 */
routes.post('/pet', petController.create);

export default routes;
