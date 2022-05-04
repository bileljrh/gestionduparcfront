import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-tab1-bon-de-command',
  templateUrl: './tab1-bon-de-command.component.html',
  styleUrls: ['./tab1-bon-de-command.component.scss']
})
export class Tab1BonDeCommandComponent implements OnInit {
  Achat: string[] = ['Achat 001', 'Achat 002', 'Achat 003', 'Achat 004', 'Achat 005', 'Achat 006', 'Achat 007'];
  displayedColumns: string[] = ['title', 'htBrut', 'htNat', 'tva', 'timbreFixale', 'ttc'];

  myControl = new FormControl();
  CodeFournisseur: string[] = ['One', 'Two', 'Three'];

  constructor() {

  }


  ngOnInit() {

  }


}
