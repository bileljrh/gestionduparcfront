import {Vehicule} from './vehicule';

export interface Affectation {
  id?: number;
  etat: string;
  natureAffectation: string;
  dateAffectation: string;
  referenceAffectation: string;
  numeroImmatriculation: string;
  numeroProprietaireEtat: string;
  numeroChassis: string;
  numeroCarteUtilisation: string;
  urlImageVehicule?: string;
  nameImageVehicule?: string;
  indexKm: number;
  vehicule?: Vehicule;
}












