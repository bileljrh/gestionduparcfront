import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-carburant',
  templateUrl: './carburant.component.html',
  styleUrls: ['./carburant.component.scss']
})
export class CarburantComponent implements OnInit {

  title: string = 'Carburant';

  constructor() {
  }

  ngOnInit(): void {
  }

}
