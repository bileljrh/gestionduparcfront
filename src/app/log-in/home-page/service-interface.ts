import {ReservationVehicule} from './exploitation/gestion-des-reservations/reservation-vehicule';
import {LocationVehicule} from './exploitation/gestion-des-locations/location-vehicule';
import {SinistreVehicule} from './exploitation/gestion-des-sinistres/sinistre-vehicule';
import {EmpruntVehicule} from './exploitation/gestion-des-emprunts/emprunt-vehicule';
import {ModifyCarteJocker} from './carburant/carte-jocker/gestion-cartes-jocker/modify-carte-jocker';
import {NouvelleCarteJocker} from './carburant/carte-jocker/gestion-cartes-jocker/nouvelle-carte-jocker/nouvelle-carte-jocker';
import {NouvelleDemandeDesaffectationCarteJocker} from './carburant/carte-jocker/gestion-demande-desaffectation-carte-jocker/nouvelle-demande-desaffectation-carte-jocker/nouvelle-demande-desaffectation-carte-jocker';
import {ModificationDemandeDesaffectationCarteJocker} from './carburant/carte-jocker/gestion-demande-desaffectation-carte-jocker/modification-demande-desaffectation-carte-jocker';
import {OrdreMission} from './ordres-de-mission/ordre-mission';
import {DemandeMaintenance} from './maintenance-et-reparation/gestion-demande-intervention/demande-maintenance';

export interface ServiceInterface {
  functionName: string;
  reservation?: ReservationVehicule;
  page?: string;
  limit?: string;
  id?: number;
  locationVehicule?: LocationVehicule;
  sinistre?: SinistreVehicule;
  sinistreVehicule?: SinistreVehicule;
  observation?: string;
  document?: FormData;
  empruntVehicule?: EmpruntVehicule;
  date?: string;
  firstDate?: string;
  secondDate?: string;
  select?: string;
  firstSelect?: string;
  secondSelect?: string;
  etatCarte?: ModifyCarteJocker;
  newCarte?: NouvelleCarteJocker;
  idCarte?: number;
  idVehicule?: number;
  dateDerniereDemande?: string;
  nouvelleDemandeDesaffectation?: NouvelleDemandeDesaffectationCarteJocker;
  modificationDemande?: ModificationDemandeDesaffectationCarteJocker;
  structure?: string;
  ordreMission?: OrdreMission;
  demandeMaintenance?: DemandeMaintenance

}
