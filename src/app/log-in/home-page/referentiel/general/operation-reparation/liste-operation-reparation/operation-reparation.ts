import {FamilleOperationReparation} from '../famille-operation-reparation/famille-operation-reparation';

export interface OperationReparation {
  id?: number;
  code: string;
  designation: string;
  familleOperations?: FamilleOperationReparation;
}
