export interface HistoriqueDemandeAnnulationCartePlafond {
  id: number;
  nomDeclarant: string;
  prenomDeclarant: string;
  dateNaissanceDeclarant: string;
  lieuNaissanceDeclarant: string;
  numeroCINDeclarant: string;
  sexeDeclarant: string;
  typeDeclarant: string;
  numero_plaque: string;
  nomBeneficiaire: string;
  matriculeBeneficiaire: string;
  structure: string;
  numeroCarte: string;
  typeCarburant: string;
  montant: number;
  causeAnnulation: string;
  dateDemande: string;
}
