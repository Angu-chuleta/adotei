import { AuthService } from './auth.service';
import { InstitutionService } from './institution.service';
import { PetService } from './pet.service';
import { UserService } from './user.service';

const petService = new PetService();
const institutionService = new InstitutionService();
const userService = new UserService();
const authService = new AuthService();

export {
  petService,
  PetService,
  institutionService,
  InstitutionService,
  userService,
  UserService,
  authService,
  AuthService,
};
