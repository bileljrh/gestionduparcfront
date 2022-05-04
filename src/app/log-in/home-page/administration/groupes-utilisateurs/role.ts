import {Utilisateur} from '../creation-utilisateurs/utilisateur';

export interface Role {
  id?: number;
  profil: string;
  designation: string;
  authorities?: string;
  users?: Utilisateur[];
}
