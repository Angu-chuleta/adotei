import { Request, Response } from 'express';
import { authService } from '../services';

class AuthController {
  login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const token = await authService.login(username, password);
      res.json(token);
    } catch (error) {
      console.log(error);

      res.status(400).json(error);
    }
  };
}

export const authController = new AuthController();
