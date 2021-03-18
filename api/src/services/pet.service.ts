import { userService } from '.';
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

  async getAll(): Promise<any[]> {
    const res = await this.BaseModel.find();
    let users = await userService.getAll();
    let pets = res.map((pet: any) => {
      let user = users.find((u) => u._id.toString() === pet.userId);
      pet.user = {
        name: user?.name,
        email: user?.email,
        telefone: user?.telefone,
        uf: user?.uf,
        cidade: user?.cidade,
      };
      return pet;
    });
    return pets;
  }
}
