import {DetailsDistributionFonction} from './details-distribution-fonction';

export interface ModifyDistributionFonction {
  idBeneficiaire: number;
  idDistribution: number;
  moisDistribution: string;
  quantiteCarburant: number;
  nombre2Bons: number;
  sourceCarburant: string;
  quota: number;
  details2Distribution: DetailsDistributionFonction;
}
