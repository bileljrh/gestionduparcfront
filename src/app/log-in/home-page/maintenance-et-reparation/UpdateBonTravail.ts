import { UpdateBonTravailOperation } from "./UpdateBonTravailOperation";

export interface UpdateBonTravail{
    id?: number;
    dateEntree:string;
    dateSortiePrevue:string;
    natureTravaux:string ;
    mode:string ;
    indexKM:string;
    observation:string;
    updateBonTravailOperation: UpdateBonTravailOperation[];
}