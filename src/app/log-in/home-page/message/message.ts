import {Utilisateur} from '../administration/creation-utilisateurs/utilisateur';

export interface Message {
  id: number;
  user: Utilisateur;
  dateSent: string;
  responded: boolean;
}
