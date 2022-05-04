import {ProgrammeEntretiensPreventifs} from '../../operation-reparation/programme-entretiens-preventifs/programme-entretiens-preventifs';

export interface Energie {
  id?: number;
  code: string;
  description: string;
  prixUnitaire: number;
  tva: number;
  programmeEntretien?: ProgrammeEntretiensPreventifs[];
}
