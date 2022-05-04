export interface TaxeCirculationTableData {
  id?: number;
  numeroQuittance: string;
  parPoids: boolean;
  poids: number;
  parPlace: boolean;
  nombrePlaces: number;
  dateDebutCirculation: string;
  dateFinCirculation: string;
  montant: number;
  dateFinValidite: string;
  idVehicule?: number;
  numeroPlaque?: string;
}
