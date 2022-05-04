import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Sort} from '@angular/material/sort';

export interface detail {
  numero: number;
  designation: string;
  quantitecommandee: number;
  quantitelivree: number;
  prixUnitaire: number;
  tva: number;
  remise: number;
  modifier: string;
  supprimer: string;
}

export interface PeriodicElement {
  title: string;
  htBrut: number;
  htNat: number;
  tva: number;
  timbreFixale: number;
  ttc: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {title: 'Commande', htBrut: 16.716, htNat: 16.716, tva: 3.009, timbreFixale: 0.600, ttc: 20.325},
  {title: 'Livraison', htBrut: 0.000, htNat: 0.000, tva: 0.000, timbreFixale: 0.600, ttc: 0.600}
];

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
  selector: 'app-tab-table',
  templateUrl: './tab-table.component.html',
  styleUrls: ['./tab-table.component.scss']
})
export class TabTableComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['title', 'htBrut', 'htNat', 'tva', 'timbreFixale', 'ttc'];
  Detail: detail[] = [
    {
      numero: 1,
      designation: 'Désignation N° 1',
      quantitecommandee: 5,
      quantitelivree: 5,
      prixUnitaire: 11450,
      tva: 18,
      remise: 3.06,
      modifier: '',
      supprimer: ''
    },
    {
      numero: 2,
      designation: 'Désignation N° 2',
      quantitecommandee: 3,
      quantitelivree: 0,
      prixUnitaire: 12360,
      tva: 15,
      remise: 2.5,
      modifier: '',
      supprimer: ''
    },
    {
      numero: 3,
      designation: 'Désignation N° 3',
      quantitecommandee: 2,
      quantitelivree: 5,
      prixUnitaire: 120360,
      tva: 18,
      remise: 7.6,
      modifier: '',
      supprimer: ''
    },
    {
      numero: 4,
      designation: 'Désignation N° 4',
      quantitecommandee: 8,
      quantitelivree: 8,
      prixUnitaire: 130000,
      tva: 7,
      remise: 15,
      modifier: '',
      supprimer: ''
    },
    {
      numero: 5,
      designation: 'Désignation N° 5',
      quantitecommandee: 1,
      quantitelivree: 1,
      prixUnitaire: 6500,
      tva: 13,
      remise: 18,
      modifier: '',
      supprimer: ''
    },
  ];

  sortedData: detail[];

  constructor() {
    this.sortedData = this.Detail.slice();
  }

  myControl = new FormControl();
  options: string[] = ['40-618', '41-630', '41-210', '42-130', '40-560', '41-230', '42-963', '40-360', '41-230'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  sortData(sort: Sort) {
    const data = this.Detail.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'numero':
          return compare(a.numero, b.numero, isAsc);
        case 'designation':
          return compare(a.designation, b.designation, isAsc);
        case 'quantitecommandee':
          return compare(a.quantitecommandee, b.quantitecommandee, isAsc);
        case 'quantitelivree':
          return compare(a.quantitelivree, b.quantitelivree, isAsc);
        case 'prixUnitaire':
          return compare(a.prixUnitaire, b.prixUnitaire, isAsc);
        case 'tva':
          return compare(a.tva, b.tva, isAsc);
        case 'remise':
          return compare(a.remise, b.remise, isAsc);
        default:
          return 0;
      }
    });
  }

}
