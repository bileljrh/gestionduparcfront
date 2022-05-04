import {Gouvernorat} from '../decoupage-administratif/gouvernorat';

export interface LieuParking {
  id?: number;
  code: string;
  adresse: string;
  gouvernorat: Gouvernorat;
}
