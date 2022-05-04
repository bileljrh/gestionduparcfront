import {Component} from '@angular/core';
import {Sort} from '@angular/material/sort';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

export interface retourCarburant {
  vehicule: string;
  delaPart: string;
  nbrBonsRetour: number;
  modifier: string;
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


@Component({
  selector: 'app-retour-de-carburant',
  templateUrl: './retour-de-carburant.component.html',
  styleUrls: ['./retour-de-carburant.component.scss']
})
export class RetourDeCarburantComponent {
  Parc: string[] = ['Parc 1', 'Parc 2', 'Parc 3', 'Parc 4', 'Parc 5', 'Parc 6', 'Parc 7'];

  RetourCarburant: retourCarburant[] = [
    {vehicule: '170360', delaPart: 'Nabil selmi', nbrBonsRetour: 3, modifier: ''},
    {vehicule: '172450', delaPart: 'Issam abid', nbrBonsRetour: 4, modifier: ''},
    {vehicule: '173600', delaPart: 'Kamel bouazzi', nbrBonsRetour: 3, modifier: ''},
    {vehicule: '170260', delaPart: 'Hamed bel arbi', nbrBonsRetour: 5, modifier: ''},
    {vehicule: '174650', delaPart: 'Moncef azaiez', nbrBonsRetour: 2, modifier: ''},
    {vehicule: '171630', delaPart: 'Haykel Hamdi', nbrBonsRetour: 1, modifier: ''},
  ];

  sortedData: retourCarburant[];

  ADD_RETOUR_CARBURANT: boolean;
  VIEW_RETOUR_CARBURANT: boolean;
  
  setDisplayedColumns() {
    this.ADD_RETOUR_CARBURANT = this.Authentication.authoritiesUtilisateur.ADD_RETOUR_CARBURANT;
    this.VIEW_RETOUR_CARBURANT = this.Authentication.authoritiesUtilisateur.VIEW_RETOUR_CARBURANT;
  }  
  constructor(private Authentication: AuthenticationServiceService) {
    this.sortedData = this.RetourCarburant.slice();
    this.setDisplayedColumns();
  }


  sortData(sort: Sort) {
    const data = this.RetourCarburant.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'vehicule':
          return compare(a.vehicule, b.vehicule, isAsc);
        case 'delaPart':
          return compare(a.delaPart, b.delaPart, isAsc);
        case 'nbrBonsRetour':
          return compare(a.nbrBonsRetour, b.nbrBonsRetour, isAsc);
        default:
          return 0;
      }
    });
  }


}
