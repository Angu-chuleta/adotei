import { AuthService } from './auth.service';
import { PetService } from './pet.service';
import { UserService } from './ong.service';

const petService = new PetService();
const userService = new UserService();
const authService = new AuthService();

export {
  petService,
  PetService,
  userService,
  UserService,
  authService,
  AuthService,
};
