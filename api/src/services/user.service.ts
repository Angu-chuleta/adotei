import { UserModel, IUserModel } from '../models';
import { BaseService } from './base.service';

export class UserService extends BaseService<IUserModel> {
  constructor() {
    super(UserModel);
  }

  async addCredit(id: string, credit: number) {
    let user;
    try {
      user = await this.BaseModel.findById(id);
    } catch (error) {
      throw new Error('Usuário inexistente');
    }
    if (user && user.credito !== null) {
      user.credito += credit;
    }
    await this.BaseModel.updateOne({ _id: id }, user);
    return { message: 'ok!' };
  }
}
