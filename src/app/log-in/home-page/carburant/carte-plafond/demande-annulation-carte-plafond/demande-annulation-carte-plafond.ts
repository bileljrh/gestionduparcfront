export interface DemandeAnnulationCartePlafond {
  id?: number;
  idCard?:number;
  nomDeclarant: string;
  prenomDeclarant: string;
  dateNaissanceDeclarant: string;
  lieuNaissanceDeclarant: string;
  numeroCINDeclarant: string;
  sexeDeclarant: string;
  typeDeclarant: string;
  numeroCarte: string;
  typeCarburant: string;
  montant: number;
  causeAnnulation: string;
  dateDemande?: string;
}
