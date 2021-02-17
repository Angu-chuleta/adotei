import { PetService } from './pet.service';
import { InstitutionService } from './institution.service';

const petService = new PetService();
const institutionService = new InstitutionService();

export {
  petService,
  PetService,
  institutionService,
  InstitutionService,
};
