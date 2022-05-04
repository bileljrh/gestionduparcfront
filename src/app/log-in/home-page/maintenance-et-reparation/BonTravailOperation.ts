import { OperationReparation } from "../referentiel/general/operation-reparation/liste-operation-reparation/operation-reparation";
import { OperationRep } from "./OperationRep";

export interface BonTravailOperation{
    id?:number;
    //famille:string;
    prix :number;
    operations:OperationRep;
   // operation:OperationReparation[];
   dateDebut?:string;

}