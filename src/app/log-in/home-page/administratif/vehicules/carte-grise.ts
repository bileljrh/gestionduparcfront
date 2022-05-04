import {Vehicule} from './vehicule';

export interface CarteGrise {
  id?: number;
  vehicule?: Vehicule;
  numeroCarteGrise: string;
  typeCarteGrise: string;
  referenceType: string;
  nombreDePlaces: number;
  carosserie: string;
  poidsTotalACharge: number;
  consommationMoyenne: number;
  chargeUtile: number;
  poidsTotalSansCharge: number;
  dimensionsPneuAvant: number;
  dimensionsPneuArriere: number;
  poidsAVide: number;
  puissanceFixale: number;
  puissanceMoteur: number;
  nombreEssieux: number;
  volumeCylindre: number;
  datePremiereMiseEnCirculation: string;
}

