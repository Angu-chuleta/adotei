import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { authConfig } from '../config';
import {
  AuthModel,
  IAuthModel,
  IUserModel,
  UserModel,
} from '../models';
import { BaseService } from './base.service';

export class AuthService extends BaseService<IAuthModel> {
  constructor() {
    super(AuthModel);
  }

  async login(username: string, password: string) {
    const auth = await this.BaseModel.findOne({ username }).exec();
    if (auth && auth.username != null && auth.password != null) {
      if (!this.checkIfPasswordIsValid(password, auth.password)) {
        throw new Error('usuário ou senhas não correspondem');
      }
      const token = jwt.sign(
        { userId: auth.id, username: auth.username },
        authConfig.jwtSecret,
        { expiresIn: '90d' },
      );
      let user;
      try {
        user = await UserModel.findById(auth.user).exec();
      } catch (error) {
        user = {};
      }
      return { token, role: auth.role, user };
    }

    throw new Error('usuário ou senhas não correspondem');
  }

  async newUser(
    username: string,
    password: string,
    role: number,
    perfil: IUserModel,
  ) {
    const user = new AuthModel();
    user.username = username;
    user.password = await this.hashPassword(password);
    user.role = role || 1;

    const hasUser = await this.BaseModel.findOne({
      username: user.username,
    }).exec();
    if (hasUser != null) {
      throw new Error('usuário já cadastrado');
    }

    try {
      // perfil.credito = 0;
      const newPerfil = await UserModel.create(perfil);
      user.user = newPerfil.id;
    } catch (error) {
      throw new Error('Erro ao criar user');
    }
    const res = await this.BaseModel.create(user);

    return res;
  }

  hashPassword = async (decrypted: string) => {
    const result = await bcrypt.hash(decrypted, 10);
    return result;
  };

  checkIfPasswordIsValid = (pass: string, hash: string) => bcrypt.compareSync(pass, hash);
}
