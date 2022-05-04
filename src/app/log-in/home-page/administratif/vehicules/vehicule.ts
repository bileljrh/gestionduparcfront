import {Affectation} from './affectation';
import {CarteGrise} from './carte-grise';
import {Exploitation} from './exploitation';
import {GenreVehicule} from '../../referentiel/general/parametres-vehicules/genre-vehicule/genre-vehicule';
import {MarqueVehicule} from '../../referentiel/general/parametres-vehicules/marque-vehicule/marque-vehicule';
import {TypeVehicule} from '../../referentiel/general/parametres-vehicules/type-vehicule/type-vehicule';

export interface Vehicule {
  affectation?: Affectation;
  carteGrise?: CarteGrise;
  exploitation?: Exploitation;
  id?: number;
  numeroPlaque: string;
  genre: GenreVehicule;
  marque: string;
  type: TypeVehicule;
  pourcentageVehicule?: number;
}





