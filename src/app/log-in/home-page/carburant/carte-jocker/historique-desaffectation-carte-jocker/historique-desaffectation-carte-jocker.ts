export interface HistoriqueDesaffectationCarteJocker {
  id?: number;
  idCarte?: number;
  idVehicule?: number;
  idBeneficiaire?: number;
  numeroCarte?: string;
  dateAffectation?: string;
  dateDemandeAffectation?: string;
  dateDemandeDesaffectation?: string;
  dateConfirmationDesaffectation?: string;
  soldeAffectation?: number;
  soldeDesaffectation?: number;
  nombreAffectation?: number;
  numero_plaque?: string;
  structure?: string;
  typeCarburant?: string;
  nomBeneficiaire?: string;
  matriculeBeneficiaire?: string;
  note?: string;
}
