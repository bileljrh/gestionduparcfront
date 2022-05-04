export interface NewEtatMensuel {
  idBeneficiaire: number;
  quantiteRestantee: number;
  quantiteDemandee: number;
  quantiteAccordee: number;
  quantiteCarburant: number;
  quantiteRetournee: number;
  indexFinMois: number;
  indexFinMoisPrecedant: number;
  nombreHeuresTravail: number;
  distanceParcourus: number;
  pourcentageConsommation: number;
  jourOuvrables: number;
  jours2Production: number;
  jours2Dispense: number;
  jours2Repos: number;
  brouillon: boolean;
  confirme: boolean;
  valide: boolean;
  moisEtat: Date;
}
