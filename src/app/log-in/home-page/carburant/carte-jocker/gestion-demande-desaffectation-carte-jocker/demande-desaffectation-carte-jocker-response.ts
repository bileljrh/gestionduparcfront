export interface DemandeDesaffectationCarteJockerResponse {
  id: number;
  idCarte: number;
  idVehicule: number;
  idBeneficiaire: number;
  numeroCarte: string;
  dateAffectation: string;
  dateDemandeAffectation: string;
  soldeAffectation: number;
  nombreAffectation: number;
  numero_plaque: string;
  structure: string;
  typeCarburant: string;
  nomBeneficiaire: string;
  matriculeBeneficiaire: string;
  soldeDesaffectation: number;
  dateDemandeDesaffectation: string;
  note: string;
}
