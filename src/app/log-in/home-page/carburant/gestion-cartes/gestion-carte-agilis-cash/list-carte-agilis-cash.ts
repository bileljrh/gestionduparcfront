export interface ListCarteAgilisCash {
  idCarte: number;
  numeroCarte: string;
  typeCarburant: string;
  soldeRestant: number;
  idVehicule: number;
  idBeneficiaire: number;
  matriculeBeneficiaire: string;
  nomBeneficiaire: string;
  numeroPlaque: string;
  designationStructure: string;
  codeStructure: string;
  dateFinValidite?: string;
}
