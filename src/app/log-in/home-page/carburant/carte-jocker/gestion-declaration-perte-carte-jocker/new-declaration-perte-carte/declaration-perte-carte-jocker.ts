import { NouvelleCarteJocker } from "../../../gestion-cartes/gestion-cartes-jocker/nouvelle-carte-jocker/nouvelle-carte-jocker";

export interface DeclarationPerteCartejocker {
  id?: number;
  nomDeclarant: string;
  prenomDeclarant: string;
  dateNaissanceDeclarant: string;
  lieuNaissanceDeclarant: string;
  numeroCINDeclarant: string;
  sexeDeclarant: string;
  typeDeclarant: string;
  typeDeclaration: string;
  datePerte: string;
  lieuPerte: string;
  idCartejocker?: number;
  circonstances: string;
  confirmed: boolean;
  idUser? : number;
}
