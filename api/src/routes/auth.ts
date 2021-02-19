import { Router } from 'express';
import { authController } from '../controllers';
import { checkJwt, checkRole } from '../middlewares';

const adminRole = 2;

const router = Router();

/**
 * @swagger
 *
 * definitions:
 *   NewUser:
 *     type: object
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *   User:
 *     allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */

/**
 * @swagger
 *
 * /auth/login:
 *   post:
 *     description: login
 *     produces:
 *       - application/jsong
 *     responses:
 *       200:
 *          description: users
 *          schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 */
router.post('/auth/login', authController.login);

/**
 * @swagger
 *
 * /auth/change-password:
 *   post:
 *     description: change the password
 *     produces:
 *       - application/jsong
 *     responses:
 *       200:
 *         description:  sucess
 */
router.post('/auth/change-password', [checkJwt], authController.changePassword);
/**
 * @swagger
 *
 * /auth/new:
 *   post:
 *     description: create new user
 *     produces:
 *       - application/jsong
 *     responses:
 *       200:
 *          description: users
 *          schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 */
router.post('/auth/new', [checkJwt, checkRole(adminRole)], authController.newUser);

router.get('/auth/list', [checkJwt, checkRole(adminRole)], authController.getAll);

router.delete('/auth/:id', [checkJwt, checkRole(adminRole)], authController.delete);

export default router;
