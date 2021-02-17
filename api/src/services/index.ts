import { PetService } from './pet.service';
import { InstitutionService } from './institution.service';
import { UserService } from './user.service';

const petService = new PetService();
const institutionService = new InstitutionService();
const userService = new UserService();

export {
  petService,
  PetService,
  institutionService,
  InstitutionService,
  userService,
  UserService,
};
