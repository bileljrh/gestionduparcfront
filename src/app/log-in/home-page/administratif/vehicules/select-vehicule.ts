export interface SelectVehicule {
  id: number;
  numeroPlaque: number;
  codeStructure?: string;
  designationStructure?: string;
  idBeneficiaire?: number;
  nomBeneficiaire?: string;
  matriculeBeneficiaire?: string;
  agePermis?: number;
  typeCarburant?: string;
}
