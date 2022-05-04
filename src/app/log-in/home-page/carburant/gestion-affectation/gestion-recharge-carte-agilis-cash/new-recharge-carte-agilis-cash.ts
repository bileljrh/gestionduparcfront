export interface NewRechargeCarteAgilisCash {
  id?: number;
  idCarteAgilisCash?: number;
  moisMission: string;
  destination: string;
  indexDepart: number;
  indexArrivee?: number;
  distanceParcourir: number;
  tauxConsommation?: number;
  montant: number;
  quantiteCarburantReservoir?: number;
  montantConfirmee?: number;
  montantAccordee?: number;
}
