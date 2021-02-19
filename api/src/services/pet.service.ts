import { PetModel, IPetModel } from '../models';
import { BaseService } from './base.service';

export class PetService extends BaseService<IPetModel> {
  constructor() {
    super(PetModel);
  }

  async getByUser(userId: string): Promise<IPetModel[]> {
    return this.BaseModel.find({
      userId,
    }).exec();
  }
}
