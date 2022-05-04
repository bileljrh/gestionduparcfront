import { DemandeMaintenance } from "src/app/log-in/home-page/maintenance-et-reparation/gestion-demande-intervention/demande-maintenance";
import { Magasin } from "../../referentiel/specifique/unite-gestion-parc/magasin";

export interface BonTravailList{
 id: number;
 dateEntree :Date ;
 dateSortie:Date ;
 dateSortiePrevue:Date ;
 natureTravaux :string;
 mode :String;
 structureName :String ;
 indexKM :number;
 idVehicule:number;
 idAtelier : number;
 demandeMaintenance: DemandeMaintenance ;
 magasin: Magasin;
   
    // idDemandeMaintenance;

}