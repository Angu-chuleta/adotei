import { PetService, petService } from '../services';
import { BaseController } from './base.controller';
import { IPetModel } from '../models';
import { Request, Response } from 'express';

class PetController extends BaseController<IPetModel, PetService> {
  constructor() {
    super(petService, {
      // keys do req.body que serão usados no create
      create: [
        'name',
        'foto',
        'porte',
        'sobre',
        'idade',
        'foiAdotado',
        'userId',
      ],
      // keys do req.body que serão usados no update
      update: ['name', 'foto', 'porte', 'sobre', 'idade', 'foiAdotado'],
    });
  }
  async myPets(req: Request & { user: any }, res: Response) {
    const user = req.user;
    const pets = await petService.getByUser(user.userId);
    res.json(pets);
  }
}

export const petController = new PetController();
