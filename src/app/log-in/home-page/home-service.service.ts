import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Vehicule} from './administratif/vehicules/vehicule';
import {Observable} from 'rxjs';
import {GenreVehicule} from './referentiel/general/parametres-vehicules/genre-vehicule/genre-vehicule';
import {MarqueVehicule} from './referentiel/general/parametres-vehicules/marque-vehicule/marque-vehicule';
import {Utilisateur} from './administration/creation-utilisateurs/utilisateur';


@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {
  genreVehicule: GenreVehicule[] = [];
  typeVehicule: string[] = [];
  marqueVehicule: string[] = [];


  constructor(private  http: HttpClient) {
  }

  getOneVehicule(id: number): Observable<Vehicule> {
    return this.http.get<Vehicule>('http://localhost:8080/vehicule/' + id);
  }

  getListGenreVehicule(): Observable<GenreVehicule[]> {
    return this.http.get<GenreVehicule[]>('http://localhost:8080/genre_vehicule');
  }

  getListMarqueVehicule(): Observable<MarqueVehicule[]> {
    return this.http.get<MarqueVehicule[]>('http://localhost:8080/marque_vehicule');
  }


  requestResetPassword(utilisateur: Utilisateur): Observable<any> {
    return this.http.post<Utilisateur>('http://localhost:8080/request_reset_password', utilisateur);
  }

  
}
