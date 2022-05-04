import {DetailsDistributionFonction} from '../details-distribution-fonction';


export interface NouvelleDistributionCarburantFonction {
  idBeneficiaire: number;
  moisDistribution: string;
  nombre2Bons: number;
  quantiteCarburant: number;
  quota: number;
  sourceCarburant: string;
  details2Distribution: DetailsDistributionFonction;
}
