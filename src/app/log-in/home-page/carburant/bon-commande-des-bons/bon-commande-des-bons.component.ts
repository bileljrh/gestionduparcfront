import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';

export interface PeriodicElement {
  date: string;
  fournisseur: string;
  affectation: string;
  montant: number;
  modifier: any;
  supprimer: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {date: '15-06-2015', fournisseur: 'Fournisseur 1', affectation: 'Affectation 1', montant: 45690, modifier: '', supprimer: ''},
  {date: '23-12-2019', fournisseur: 'Fournisseur 2', affectation: 'Affectation 2', montant: 36980, modifier: '', supprimer: ''},
  {date: '14-12-2016', fournisseur: 'Fournisseur 3', affectation: 'Affectation 3', montant: 54690, modifier: '', supprimer: ''},
  {date: '01-03-2020', fournisseur: 'Fournisseur 4', affectation: 'Affectation 4', montant: 88650, modifier: '', supprimer: ''},
  {date: '25-04-2019', fournisseur: 'Fournisseur 5', affectation: 'Affectation 5', montant: 44560, modifier: '', supprimer: ''},
];


@Component({
  selector: 'app-bon-commande-des-bons',
  templateUrl: './bon-commande-des-bons.component.html',
  styleUrls: ['./bon-commande-des-bons.component.scss']
})
export class BonCommandeDesBonsComponent implements OnInit {
  UGP: string[] = ['UGP 1', 'UGP 2', 'UGP 3', 'UGP 4', 'UGP 5', 'UGP 6'];
  Annee: string[] = ['2013', '2014', '2015', '2016', '2017', '2018', '2019'];
  idBc: 1;


  ADD_BON_CARBURANT_BON: boolean;
  VIEW_BON_CARBURANT_BON: boolean;
  
  
  setDisplayedColumns() {
    this.ADD_BON_CARBURANT_BON = this.Authentication.authoritiesUtilisateur.ADD_BON_CARBURANT_BON;
    this.VIEW_BON_CARBURANT_BON = this.Authentication.authoritiesUtilisateur.VIEW_BON_CARBURANT_BON;

  }  

  constructor(private Authentication: AuthenticationServiceService){
    this.setDisplayedColumns();
  }


  displayedColumns: string[] = ['date', 'fournisseur', 'affectation', 'montant', 'modifier', 'supprimer'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }


  deleteBonCommande(i: number) {


  }
}
