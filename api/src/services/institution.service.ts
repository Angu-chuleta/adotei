import { BaseService } from './base.service';
import { InstitutionModel, IInstitutionModel } from '../models';

export class InstitutionService extends BaseService<IInstitutionModel> {
  constructor() {
    super(InstitutionModel);
  }
}
