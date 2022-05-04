export interface CarteJockerDataResponse {
  id?: number;
  numeroCarte: string;
  dateDebutUtilisation: string;
  dateDerniereDesaffectation: string;
  dateDerniereAffectation: string;
  nombreAffectation: number;
  solde: number;
  affected: boolean;
}
