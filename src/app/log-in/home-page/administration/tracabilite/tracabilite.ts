import {Utilisateur} from '../creation-utilisateurs/utilisateur';

export interface Tracabilite {
  id: number;
  user: Utilisateur;
  dateOperation: string;
  nomModule: string;
  operation: string;
  detailsOperation: string;
}
