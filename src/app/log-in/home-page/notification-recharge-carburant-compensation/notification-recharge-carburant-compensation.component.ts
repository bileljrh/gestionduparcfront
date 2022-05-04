import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../../authentication-service.service';
import { HomePageComponent } from '../home-page.component';

@Component({
  selector: 'app-notification-recharge-carburant-compensation',
  templateUrl: './notification-recharge-carburant-compensation.component.html',
  styleUrls: ['./notification-recharge-carburant-compensation.component.scss']
})
export class NotificationRechargeCarburantCompensationComponent implements OnInit {
  t:number ;

  constructor( private home :HomePageComponent,private Authentication: AuthenticationServiceService) {
    this.t=this.home.t+1;
  }

  ngOnInit(): void {
    this.t=this.home.t+1;
  }
}
