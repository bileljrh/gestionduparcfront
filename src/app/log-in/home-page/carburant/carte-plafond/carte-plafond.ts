import {Vehicule} from '../../administratif/vehicules/vehicule';

export interface CartePlafond {
  vehicule?: Vehicule;
  id?: number;
  montant: number;
  dateAjout: string;
  numeroCarte: string;
  typeCarburant: string;
  affected: boolean;
  confirmed: boolean;
  validated: boolean;
  deconfirmed: boolean;
  devalidated: boolean;
  requestForAffectation: boolean;
  requestForDesaffectation: boolean;
  dateDerniereAffectation: string;
  dateDerniereDesaffectation: string;
  dateDerniereDemandeAffectation: string;
  dateDerniereDemandeDesaffectation: string;
  numeroPlaque: string;
  structure: string;
  nomBeneficiaire: string;
}
