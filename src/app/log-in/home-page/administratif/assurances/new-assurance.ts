export interface NewAssurance {
  id?: number;
  datePMC: string;
  nombreplaces: number;
  puissanceFiscale: number;
  montantAssurance: number;
  dateDebutValidite: string;
  dateFinValidite: string;
  assuranceSP: string;
  numeroContrat: string;
  compagnieAssurance: string;
  idVehicules: number[];
}
