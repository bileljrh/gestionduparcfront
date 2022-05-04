import {Article} from '../../articles/article';
import {MarqueVehicule} from '../marque-vehicule/marque-vehicule';

export interface TypeVehicule {
  id?: number;
  code: string;
  designation: string;
  articles?: Article[];
  marques?: MarqueVehicule;
}
