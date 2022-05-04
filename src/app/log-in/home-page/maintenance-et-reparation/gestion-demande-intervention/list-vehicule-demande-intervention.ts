export interface ListVehiculeDataByStructure {
  idBeneficiaire: number;
  nomBeneficiaire: string;
  matriculeBeneficiaire: string;
  typeCarburant: string;
  idVehicule: number;
  numeroSerie: string;
}


export interface ListVehiculeDemandeIntervention {
  structure: string;
  vehiculesData: ListVehiculeDataByStructure[];
}
