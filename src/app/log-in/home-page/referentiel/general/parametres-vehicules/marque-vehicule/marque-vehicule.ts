import {Article} from '../../articles/article';
import {TypeVehicule} from '../type-vehicule/type-vehicule';

export interface MarqueVehicule {
  id?: number;
  code: string;
  designation: string;
  articles?: Article[];
  types?: TypeVehicule[];
}
