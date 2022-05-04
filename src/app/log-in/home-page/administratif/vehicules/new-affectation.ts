export interface NewAffectation {
  id?: number;
  etat: string;
  natureAffectation: string;
  dateAffectation: string;
  referenceAffectation: string;
  numeroImmatriculation: string;
  numeroProprietaireEtat: string;
  numeroChassis: string;
  numeroCarteUtilisation: string;
  indexKm: number;
  idGouvernorat?: number;
  idBeneficiaire?: number;
  idLieuParking?: number;
}
