import {Structure} from './referentiel/specifique/structure-administrative/structure';
import {UGP} from './referentiel/specifique/unite-gestion-parc/ugp';
import {Magasin} from './referentiel/specifique/unite-gestion-parc/magasin';

export interface CustomUser {
  authorities: string[];
  id: number;
  nom: string;
  prenom: string;
  matricule: string;
  email: string;
  typeCompte: string;
  structures: Structure[];
  ugps: UGP[];
  magasins: Magasin[];
}
