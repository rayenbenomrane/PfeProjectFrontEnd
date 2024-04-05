import { TypeIdentifiant } from "../app/enums/TypeIdentifiant.enum";
import { UserRole } from "../app/enums/UserRole.enum";
import { Contribuable } from "./Contribuable";

export interface Inscription {
  idInscription: number;
  email: string;
  typeIdentifiant: TypeIdentifiant;
  valeurIdentifiant: string;
  nom: string;
  prenom: string;
  password: string;
  NonLocked: boolean;
  Poste: string;
  contribuable: Contribuable;
}
