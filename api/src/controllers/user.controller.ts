import { IUserModel } from '../models';
import { userService, UserService } from '../services';
import { BaseController } from './base.controller';
import { Request, Response } from 'express';
import { authService } from '../services';

class UserController extends BaseController<IUserModel, UserService> {
  constructor() {
    super(userService, {
      // keys do req.body que serão usados no create
      create: [
        'name',
        'foto',
        'email',
        'telefone',
        'sobre',
        'pets',
        'uf',
        'cidade',
        'bank_information',
      ],
      // keys do req.body que serão usados no update
      update: [
        'name',
        'foto',
        'email',
        'telefone',
        'sobre',
        'pets',
        'uf',
        'cidade',
        'bank_information',
      ],
    });
  }

  create = async (req: Request, res: Response) => {
    try {
      const model = this.keys.create.reduce(
        (obj, key) => ({ ...obj, ...{ [key]: req.body[key] } }),
        {} as any,
      );
      model.password = authService.hashPassword(model.password);
      const reg = await this.service.create(model);
      res.status(201).json(reg);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const token = await authService.login(username, password);
      res.json(token);
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

export const userController = new UserController();
