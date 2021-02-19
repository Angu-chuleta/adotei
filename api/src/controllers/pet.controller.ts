import { Request, Response } from 'express';
import { IPetModel } from '../models';
import { PetService, petService } from '../services';
import { BaseController } from './base.controller';

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

  myPets = async (req: Request & { user?: any }, res: Response) => {
    try {
      const { user } = req;
      const pets = await petService.getByUser(user.userId);
      res.json(pets);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export const petController = new PetController();
