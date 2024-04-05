import { Activite } from "./Activite";
import { FormeJuridique } from "./FormeJuridique";
import { Pays } from "./Pays";

export interface Contribuable {
  idContribuable: number;
  matriculeFiscale: number;
  nomCommercial: string;
  email: string;
  address: string;
  dateDeMatriculation: Date;
  raisonSocial: string;
  directeur: string;
  formeJuridique: FormeJuridique;
  pays: Pays;
  activite: Activite;
}
