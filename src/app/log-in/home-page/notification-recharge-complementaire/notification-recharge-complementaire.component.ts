import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../../authentication-service.service';
import { HomePageComponent } from '../home-page.component';

@Component({
  selector: 'app-notification-recharge-complementaire',
  templateUrl: './notification-recharge-complementaire.component.html',
  styleUrls: ['./notification-recharge-complementaire.component.scss']
})
export class NotificationRechargeComplementaireComponent implements OnInit {
  t:number ;

  constructor( private home :HomePageComponent,private Authentication: AuthenticationServiceService) {
    this.t=this.home.t+1;
  }

  ngOnInit(): void {
    this.t=this.home.t+1;
  }
}
