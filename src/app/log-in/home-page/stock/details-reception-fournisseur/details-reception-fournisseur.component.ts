import {Component} from '@angular/core';
import {Sort} from '@angular/material/sort';

export interface details {
  codeArticle: string;
  designation: string;
  cmd: string;
  quantiteRecue: string;
  restante: string;
  supprimer: string;
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


@Component({
  selector: 'app-details-reception-fournisseur',
  templateUrl: './details-reception-fournisseur.component.html',
  styleUrls: ['./details-reception-fournisseur.component.scss']
})
export class DetailsReceptionFournisseurComponent {
  Details: details[] = [
    {
      codeArticle: '15-036-15',
      designation: 'désignation N° 1',
      cmd: '',
      quantiteRecue: '189',
      restante: '13',
      supprimer: ''
    },
    {
      codeArticle: '18-320-14',
      designation: 'désignation N° 2',
      cmd: '',
      quantiteRecue: '44',
      restante: '21',
      supprimer: ''
    },
    {
      codeArticle: '88-380-39',
      designation: 'désignation N° 3',
      cmd: '',
      quantiteRecue: '23',
      restante: '13',
      supprimer: ''
    },
    {
      codeArticle: '07-203-96',
      designation: 'désignation N° 4',
      cmd: '',
      quantiteRecue: '180',
      restante: '07',
      supprimer: ''
    },
    {
      codeArticle: '17-960-23',
      designation: 'désignation N° 5',
      cmd: '',
      quantiteRecue: '75',
      restante: '23',
      supprimer: ''
    },
  ];

  sortedData: details[];

  constructor() {
    this.sortedData = this.Details.slice();
  }

  sortData(sort: Sort) {
    const data = this.Details.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'codeArticle':
          return compare(a.codeArticle, b.codeArticle, isAsc);
        case 'designation':
          return compare(a.designation, b.designation, isAsc);
        case 'cmd':
          return compare(a.cmd, b.cmd, isAsc);
        case 'quantiteRecue':
          return compare(a.quantiteRecue, b.quantiteRecue, isAsc);
        case 'restante':
          return compare(a.restante, b.restante, isAsc);
        default:
          return 0;
      }
    });
  }

}
