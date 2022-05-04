import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';
import { HomePageComponent } from '../../../home-page.component';

@Component({
  selector: 'app-notification-inventaire',
  templateUrl: './notification-inventaire.component.html',
  styleUrls: ['./notification-inventaire.component.scss']
})
export class NotificationInventaireComponent implements OnInit {
  t:number ;
  CONFIRM_DEMANDE_RECHARGE_SOUS_COMPTE: boolean;
  VALID_DEMANDE_RECHARGE_SOUS_COMPTE: boolean;
  
    constructor( private home :HomePageComponent,private Authentication: AuthenticationServiceService) {
      this.t=this.home.t+1;
    }
  
    ngOnInit(): void {
      this.t=this.home.t+1;
    }
  
}
