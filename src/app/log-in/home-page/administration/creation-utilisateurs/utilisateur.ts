import {UGP} from '../../referentiel/specifique/unite-gestion-parc/ugp';
import {Structure} from '../../referentiel/specifique/structure-administrative/structure';
import {Magasin} from '../../referentiel/specifique/unite-gestion-parc/magasin';
import {Authority} from '../groupes-utilisateurs/authority';
import {Role} from '../groupes-utilisateurs/role';
import {Tracabilite} from '../tracabilite/tracabilite';

export interface Utilisateur {
  id?: number;
  nom?: string;
  prenom?: string;
  matricule: string;
  ordre?: number;
  mot2passe?: string;
  email?: string;
  dateDerniereConnexion?: string;
  dateAjout?: string;
  isActive?: boolean;
  isNotLocked?: boolean;
  structures?: Structure[];
  roles?: Role[];
  ugps?: UGP[];
  magasins?: Magasin[];
  tracabilites?: Tracabilite[];
  authorities?: Authority[];
}
