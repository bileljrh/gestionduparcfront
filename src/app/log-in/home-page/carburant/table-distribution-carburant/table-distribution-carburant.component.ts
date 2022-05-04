import {Component, Input, OnInit} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {DistributionCarburant} from '../distribution-carburant';
import {CarburantService} from '../carburant.service';


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
  selector: 'app-table-distribution-carburant',
  templateUrl: './table-distribution-carburant.component.html',
  styleUrls: ['./table-distribution-carburant.component.scss']
})
export class TableDistributionCarburantComponent implements OnInit {
  @ Input() DCFTab: DistributionCarburant[];
  sortedData: DistributionCarburant[];
  ask4Delete: boolean;
  containerX: number;
  containerY: number;
  selectedRow: number;
  containerH: number;
  containerW: number;

  constructor(private carburantService: CarburantService) {
    this.ask4Delete = false;
  }

  ngOnInit(): void {
    this.sortedData = this.DCFTab.slice();
  }

  sortData(sort: Sort) {
    const data = this.DCFTab.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'matricule':
          return compare(a.matricule, b.matricule, isAsc);
        case 'beneficiaire':
          return compare(a.beneficiaire, b.beneficiaire, isAsc);
        case 'vehicule':
          return compare(a.vehicule, b.vehicule, isAsc);
        case 'carburant':
          return compare(a.carburant, b.carburant, isAsc);
        case 'nbrDeBons':
          return compare(a.nbrDeBons, b.nbrDeBons, isAsc);
        default:
          return 0;
      }
    });
  }


  /*deleteDistCarF(i: number) {

    this.selectedIdReforme = idReforme;
    this.containerX = this.DCFTab.nativeElement.offsetTop;
    this.containerY = this.TABref.nativeElement.offsetLeft;
    this.containerH = this.TABref.nativeElement.offsetHeight;
    this.containerW = this.TABref.nativeElement.offsetWidth;
    this.selectedRow = i;

    this.ask4Delete = true;
  }
*/
  onDenyDelete() {

  }

  onConfirmDelete() {

  }
}
