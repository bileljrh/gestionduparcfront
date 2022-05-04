import {Article} from '../../articles/article';

export interface GenreVehicule {
  id?: number;
  code: string;
  designation: string;
  articles?: Article[];
}
