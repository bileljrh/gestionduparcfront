import {DetailsDistributionFonction} from './details-distribution-fonction';

export interface DistributionFonctionTabData {
  idVehicule: number;
  idBeneficiaire: number;
  idDistribution: number;
  matriculeBeneficiaire: string;
  nomBeneficiaire: string;
  numero_plaque: string;
  quantiteCarburant: number;
  nombre2Bons: number;
  quota: number;
  moisDistribution: string;
  sourceCarburant: string;
  details2Distribution: DetailsDistributionFonction;
}
