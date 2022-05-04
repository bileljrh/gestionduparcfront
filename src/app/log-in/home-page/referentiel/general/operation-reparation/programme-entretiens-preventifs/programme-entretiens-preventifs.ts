import {MarqueVehicule} from '../../parametres-vehicules/marque-vehicule/marque-vehicule';
import {TypeVehicule} from '../../parametres-vehicules/type-vehicule/type-vehicule';
import {Energie} from '../../parametres-generaux/energie/energie';

export interface ProgrammeEntretiensPreventifs {
  id?: number;
  code: string;
  cycle: string;
  designation: string;
  energie: Energie;
  marque: MarqueVehicule;
  type: TypeVehicule;
}
