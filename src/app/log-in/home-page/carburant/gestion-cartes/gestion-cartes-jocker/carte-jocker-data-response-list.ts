export interface CarteJockerDataResponseList {
  id: number;
  idVehicule: number;
  idCarte: number;
  idBeneficiaire: number;
  numeroPlaque: string;
  dateAffectation: string;
  codeStructure: string;
  designationStructure: string;
  typeCarburant: string;
  nomBeneficiaire: string;
  matriculeBeneficiaire: string;
  numeroCarte: string;
  dateDebutUtilisation: string;
  dateDerniereDesaffectation: string;
  dateDerniereAffectation: string;
  nombreAffectation: number;
  solde: number;
  dateFinValidite: string;
  confirmed: boolean;
  validated: boolean;
}
