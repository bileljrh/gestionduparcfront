import {Role} from './role';
import {User} from '../../carburant/etat-mensuel/details-exploitation/details-exploitation.component';

export interface Authority {
  id?: number;
  authority: string;
  roles?: Role[];
  users?: User[];
}
