import { Router } from 'express';
// import { checkJwt } from '../middlewares/auth.middleware';
// import { checkRole } from '../middlewares/checkRole';
import { institutionController } from '../controllers';

const routes = Router();

// const adminRole = 2;
// institution routes

/**
 * @swagger
 *
 * /institution:
 *   get:
 *     description: institution
 *     produces:
 *       - application/jsong
 *     responses:
 *       200:
 *         description: get all institutions
 */
routes.get('/institution', [/* checkJwt */], institutionController.getAll);
/**
 * @swagger
 *
 * /institution/:id:
 *   get:
 *     description: institution
 *     produces:
 *       - application/jsong
 *     responses:
 *       200:
 *         description: get one institution by id
 */
routes.get('/institution/:id', [/* checkJwt */], institutionController.getOne);
/**
 * @swagger
 *
 * /institution/:id:
 *   put:
 *     description: update one institution
 *     produces:
 *       - application/jsong
 *     responses:
 *       200:
 *         description: institution sucess
 */
routes.put(
  '/institution/:id',
  [/* checkJwt, checkRole(adminRole) */],
  institutionController.update,
);
/**
 * @swagger
 *
 * /institution/:id:
 *   delete:
 *     description: ping
 *     produces:
 *       - application/jsong
 *     responses:
 *       200:
 *         description: ping
 */
routes.delete(
  '/institution/:id',
  [/* checkJwt, checkRole(adminRole) */],
  institutionController.delete,
);
/**
 * @swagger
 *
 * /institution:
 *   post:
 *     description: institution
 *     produces:
 *       - application/jsong
 *     responses:
 *       200:
 *         description: institution
 */
routes.post(
  '/institution',
  [/* checkJwt, checkRole(adminRole) */],
  institutionController.create,
);

export default routes;
