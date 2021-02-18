import { Request, Response } from 'express';
import { IAuthModel } from '../models';
import { authService, AuthService } from '../services';
import { BaseController } from './base.controller';

class AuthController extends BaseController<IAuthModel, AuthService> {
  constructor() {
    super(authService, {
      // keys do req.body que serão usados no create
      create: ['username', 'password', 'role'],
      // keys do req.body que serão usados no update
      update: ['username', 'password', 'role'],
    });
  }

  login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const token = await authService.login(username, password);
      res.json(token);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  changePassword = async () => {};

  newUser = async (req: Request, res: Response) => {
    // Get parameters from the body
    try {
      const {
        username,
        password,
        role,
        user,
      } = req.body;

      if (username !== null && password !== null && user !== null) {
        const auth = await authService.newUser(username, password, role, user);
        res.json(auth);
      } else {
        res.status(400).json({ message: 'Objeto inválido' });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

export const authController = new AuthController();
