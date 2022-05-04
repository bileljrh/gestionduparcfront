import {OperationReparation} from '../liste-operation-reparation/operation-reparation';

export interface FamilleOperationReparation {
  id?: number;
  code: string;
  designation: string;
  operationsReparation?: OperationReparation[];
}
