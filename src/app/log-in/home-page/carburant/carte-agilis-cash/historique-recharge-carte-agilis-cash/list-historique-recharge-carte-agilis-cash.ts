export interface ListHistoriqueRechargeCarteAgilisCash {
  id: number;
  idCarte: number;
  idVehicule: number;
  idBeneficiaire: number;
  moisMission: string;
  destination: string;
  indexDepart: number;
  indexArrivee: number;
  distanceParcourir: number;
  tauxConsommation: number;
  montantDemandee: number;
  quantiteCarburantReservoir: number;
  numero_plaque: string;
  structure: string;
  nomBeneficiaire: string;
  matriculeBeneficiaire: string;
  numeroCarte: string;
  typeCarburant: string;
  dateDemandeAffectation: string;
  dateAffectation: string;
  soldeRestant: number;
}
