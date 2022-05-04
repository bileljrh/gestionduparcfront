export interface EtatMensuelTabData {
  idBeneficiaire: number;
  idEtatMensuel: number;
  idVehicule: number;
  structure: string;
  nomBeneficiaire: string;
  matriculeBeneficiaire: string;
  numero_plaque: string;
  quantiteRestantee: number;
  quantiteDemandee: number;
  quantiteAccordee: number;
  indexFinMois: number;
  nombreHeuresTravail: number;
  quantiteCarburant: number;
  quantiteRetournee: number;
  indexFinMoisPrecedant: number;
  pourcentageConsommation: number;
  poucentageVehicule: number;
  distanceParcourus: number;
  jourOuvrables: number;
  jours2Production: number;
  jours2Dispense: number;
  jours2Repos: number;
  brouillon: boolean;
  confirme: boolean;
  valide: boolean;
}
