import {Component, OnInit} from '@angular/core';
import {Sort} from '@angular/material/sort';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

export interface parkApark {
  uGPdestinataire: string;
  carburant: string;
  nbreDeBons: string;
  edit: string;
  delete: string;
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
  selector: 'app-transfert-de-park-aparc',
  templateUrl: './transfert-de-park-aparc.component.html',
  styleUrls: ['./transfert-de-park-aparc.component.scss']
})
export class TransfertDeParkAParcComponent implements OnInit {
  Mois: string[] = ['-- -- --', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  Annee: string[] = ['-- -- --', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036', '2037', '2038', '2039', '2040', '2041', '2042', '2043', '2044', '2045', '2046', '2047', '2048', '2049', '2050', '2051', '2052', '2053', '2054', '2055', '2056', '2057', '2058', '2059', '2060'];
  UGP: string[] = ['-- -- --', 'UGP 1', 'UGP 2', 'UGP 3', 'UGP 4', 'UGP 5'];

  ParkApark: parkApark[] = [
    {uGPdestinataire: 'Parc DCT 1', carburant: 'S/Plomb 20 L', nbreDeBons: '8', edit: '', delete: ''},
    {uGPdestinataire: 'Parc DCT 4', carburant: 'Gasoil 20 L', nbreDeBons: '5', edit: '', delete: ''},
    {uGPdestinataire: 'Parc DCT 1', carburant: 'S/Plomb 20 L', nbreDeBons: '2', edit: '', delete: ''},
    {uGPdestinataire: 'Parc DCT 3', carburant: 'S/Plomb 20 L', nbreDeBons: '4', edit: '', delete: ''},
    {uGPdestinataire: 'Parc DCT 2', carburant: 'Gasoil 20 L', nbreDeBons: '6', edit: '', delete: ''},
    {uGPdestinataire: 'Parc DCT 4', carburant: 'Gasoil 20 L', nbreDeBons: '2', edit: '', delete: ''},
    {uGPdestinataire: 'Parc DCT 3', carburant: 'S/Plomb 20 L', nbreDeBons: '5', edit: '', delete: ''},
    {uGPdestinataire: 'Parc DCT 2', carburant: 'S/Plomb 20 L', nbreDeBons: '7', edit: '', delete: ''},
  ];

  sortedData: parkApark[];

  ADD_TRANSFERT_PARC: boolean;
  VIEW_TRANSFERT_PARC: boolean;
  DETAIL_TRANSFERT_PARC: boolean;
  
  setDisplayedColumns() {
    this.ADD_TRANSFERT_PARC = this.Authentication.authoritiesUtilisateur.ADD_TRANSFERT_PARC;
    this.VIEW_TRANSFERT_PARC = this.Authentication.authoritiesUtilisateur.VIEW_TRANSFERT_PARC;
    this.DETAIL_TRANSFERT_PARC = this.Authentication.authoritiesUtilisateur.DETAIL_TRANSFERT_PARC;
  }  
  constructor(private Authentication: AuthenticationServiceService) {
    this.sortedData = this.ParkApark.slice();
    this.setDisplayedColumns();
  }

  sortData(sort: Sort) {
    const data = this.ParkApark.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'uGPdestinataire':
          return compare(a.uGPdestinataire, b.uGPdestinataire, isAsc);
        case 'carburant':
          return compare(a.carburant, b.carburant, isAsc);
        case 'nbreDeBons':
          return compare(a.nbreDeBons, b.nbreDeBons, isAsc);
        default:
          return 0;
      }
    });
  }

  ngOnInit(): void {
  }


}
