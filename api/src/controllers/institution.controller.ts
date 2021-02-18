import { institutionService, InstitutionService } from '../services';
import { BaseController } from './base.controller';
import { IInstitutionModel } from '../models';

class InstitutionController extends BaseController<IInstitutionModel, InstitutionService> {
  constructor() {
    super(institutionService, {
      // keys do req.body que serão usados no create
      create: [
        'name',
        'foto',
        'email',
        'telefone',
        'sobre',
        'credito',
        'valido',
        'termo',
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
        'credito',
        'valido',
        'termo',
        'pets',

        'uf',
        'cidade',
        'bank_information',
      ],
    });
  }
}

export const institutionController = new InstitutionController();
