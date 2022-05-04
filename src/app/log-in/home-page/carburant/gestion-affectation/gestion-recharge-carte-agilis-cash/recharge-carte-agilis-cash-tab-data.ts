export interface RechargeCarteAgilisCashTabData {
  id?: number;
  idVehicule: number;
  numeroCarte: string;
  typeCarburant: string;
  montant: number;
  dateFinValidite: string;
  numeroPlaque: string;
  codeStructure: string;
  designationStructure: string;
  nomBeneficiaire: string;
  matriculeBeneficiaire: string;
  moisMission: string;
  destination: string;
  indexDepart: number;
  indexArrivee: number;
  distanceParcourir: number;
  tauxConsommation: number;
  quantiteCarburantReservoir: number;
  confirmed: boolean;
  validated: boolean;
  montantConfirmee: number;
  montantAccordee: number;
}
