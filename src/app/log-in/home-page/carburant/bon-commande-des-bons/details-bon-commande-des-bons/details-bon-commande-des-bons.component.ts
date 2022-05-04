import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface DetailsCMD {
  index: number;
  energie: string;
  type: string;
  bon: string;
  quantitee_commandee: number;
  quantitee_livree: number;
  delete: any;
}

const detailsCMD: DetailsCMD[] = [
  {index: 1, energie: 'Energie 1', type: 'Type 1', bon: 'Bon 1', quantitee_commandee: 5200, quantitee_livree: 3860, delete: ''},
  {index: 2, energie: 'Energie 2', type: 'Type 2', bon: 'Bon 2', quantitee_commandee: 13020, quantitee_livree: 11320, delete: ''},
  {index: 3, energie: 'Energie 3', type: 'Type 3', bon: 'Bon 3', quantitee_commandee: 45630, quantitee_livree: 32650, delete: ''},
  {index: 4, energie: 'Energie 4', type: 'Type 4', bon: 'Bon 4', quantitee_commandee: 55630, quantitee_livree: 45210, delete: ''},
  {index: 5, energie: 'Energie 5', type: 'Type 5', bon: 'Bon 5', quantitee_commandee: 42032, quantitee_livree: 41265, delete: ''},
];

export interface DetailsLVR {
  quantite_livree: number;
  numero_bon_du: string;
  au: string;
  delete: any;
}

const detailsLVR: DetailsLVR[] = [
  {quantite_livree: 45, numero_bon_du: '45698247', au: '45698690', delete: ''},
  {quantite_livree: 85, numero_bon_du: '48544588', au: '48544792', delete: ''},
  {quantite_livree: 63, numero_bon_du: '45885788', au: '45885941', delete: ''},
  {quantite_livree: 11, numero_bon_du: '41987725', au: '41987896', delete: ''},
  {quantite_livree: 53, numero_bon_du: '53895756', au: '53895831', delete: ''},
  {quantite_livree: 29, numero_bon_du: '69574800', au: '69574823', delete: ''},
];

@Component({
  selector: 'app-details-bon-commande-des-bons',
  templateUrl: './details-bon-commande-des-bons.component.html',
  styleUrls: ['./details-bon-commande-des-bons.component.scss']
})
export class DetailsBonCommandeDesBonsComponent implements OnInit {

  constructor() {
  }

  displayedColumns1: string[] = ['index', 'energie', 'type', 'bon', 'quantitee_commandee', 'quantitee_livree', 'delete'];
  displayedColumns2: string[] = ['quantite_livree', 'numero_bon_du', 'au', 'delete'];
  dataSource1 = new MatTableDataSource(detailsCMD);
  dataSource2 = new MatTableDataSource(detailsLVR);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource1.sort = this.sort;
    this.dataSource2.sort = this.sort;
  }

}
