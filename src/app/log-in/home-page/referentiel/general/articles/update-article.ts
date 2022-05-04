export interface UpdateArticle {
  id?: number;
  designation: string;
  quantiteStock: number;
  prix: number;
  idUgp: number;
  dateAjout: string;
  idSousFamille: number;
  idMarqueVehicule: number;
  idTypeVehicule: number;
  idGenreVehicule: number;
  codeArticle: string;
  quantiteLivree: number;
  tva: number;
  remise: number;
  alertStock ? :number ;
}
