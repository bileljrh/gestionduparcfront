export interface DeclarationPerteCartePlafond {
  id?: number;
  nomDeclarant: string;
  prenomDeclarant: string;
  dateNaissanceDeclarant: string;
  lieuNaissanceDeclarant: string;
  numeroCINDeclarant: string;
  sexeDeclarant: string;
  typeDeclarant: string;
  typeDeclaration: string;
  idCarteplafond?: number;
  idUser? : number;
  datePerte: string;
  lieuPerte: string;
  circonstances: string;
  confirmed: boolean;
}
