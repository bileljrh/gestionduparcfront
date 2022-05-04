import {Component} from '@angular/core';
import {Sort} from '@angular/material/sort';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

export interface suivi {
  affectation: string;
  carburant: string;
  entree: number;
  sortie: number;
  complementaire: number;
  inventaire: number;
  enStock: number;
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.scss']
})
export class SuiviComponent {
  UGP: string[] = ['Parc central', 'Parc secondaire 1', 'Parc secondaire 2', 'Parc secondaire 3', 'Parc secondaire 4'];
  Suivi: suivi[] = [
    {
      affectation: 'Service',
      carburant: 'Gasoil 100L',
      entree: 120,
      sortie: 150,
      complementaire: 18,
      inventaire: 300,
      enStock: 0
    },
    {
      affectation: 'Service',
      carburant: 'Gasoil 20L',
      entree: 1750,
      sortie: 1830,
      complementaire: 120,
      inventaire: 420,
      enStock: 560
    },
    {
      affectation: 'Service',
      carburant: 'S/plomb 20L',
      entree: 4730,
      sortie: 4812,
      complementaire: 320,
      inventaire: 310,
      enStock: 360
    },
    {
      affectation: 'Service',
      carburant: 'S/plomb 20L',
      entree: 623,
      sortie: 725,
      complementaire: 36,
      inventaire: 620,
      enStock: 400
    },
    {
      affectation: 'Fonction',
      carburant: 'Gasoil 20L',
      entree: 10560,
      sortie: 10723,
      complementaire: 28,
      inventaire: 120,
      enStock: 0
    },
    {
      affectation: 'Fonction',
      carburant: 'S/plomb 20L',
      entree: 12659,
      sortie: 13210,
      complementaire: 230,
      inventaire: 530,
      enStock: 120
    },
  ];

  sortedData: suivi[];

  ADD_SUIVI: boolean;
  VIEW_SUIVI: boolean;
  setDisplayedColumns() {
    this.ADD_SUIVI = this.Authentication.authoritiesUtilisateur.ADD_SUIVI;
    this.VIEW_SUIVI = this.Authentication.authoritiesUtilisateur.VIEW_SUIVI;

  }  

  constructor(private Authentication: AuthenticationServiceService){
    this.sortedData = this.Suivi.slice();

    this.setDisplayedColumns();
  }
  sortData(sort: Sort) {
    const data = this.Suivi.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'affectation':
          return compare(a.affectation, b.affectation, isAsc);
        case 'carburant':
          return compare(a.carburant, b.carburant, isAsc);
        case 'entree':
          return compare(a.entree, b.entree, isAsc);
        case 'sortie':
          return compare(a.sortie, b.sortie, isAsc);
        case 'complementaire':
          return compare(a.complementaire, b.complementaire, isAsc);
        case 'inventaire':
          return compare(a.inventaire, b.inventaire, isAsc);
        case 'enStock':
          return compare(a.enStock, b.enStock, isAsc);
        default:
          return 0;
      }
    });
  }


}
