import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-referentiel',
  templateUrl: './referentiel.component.html',
  styleUrls: ['./referentiel.component.scss']
})
export class ReferentielComponent implements OnInit {

  title: string = 'Reférentiel';

  constructor() {
  }

  ngOnInit(): void {
  }

}
