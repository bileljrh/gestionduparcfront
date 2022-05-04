export interface AffectationCarteTabData {
  idCartePlafond: number;
  idBeneficiaire: number;
  idVehicule: number;
  numeroCarte: string;
  montant: number;
  matriculeBeneficiaire: string;
  nomBeneficiaire: string;
  numeroPlaque: string;
  typeCarburant: string;
  structure: string;
  dateDerniereAffectation: string;
  dateDerniereDesaffectation: string;
  dateDerniereDemandeAffectation: string;
  dateDerniereDemandeDesaffectation: string;
  affected: boolean;
  confirmed: boolean;
  validated: boolean;
  deconfirmed: boolean;
  devalidated: boolean;
}
