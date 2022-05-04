export interface NewUtilisateur {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  matricule: string;
  mot2passe?: string;
  typeCompte?: string;
  idUgp: number;
  idStructure: number;
  idMagasin: number;
  ordre: number;
  idRole? : number ;
}
