import {Component, OnInit} from '@angular/core';
import { AuthenticationServiceService } from '../../authentication-service.service';
import { HomePageComponent } from '../home-page.component';

@Component({
  selector: 'app-notification-element',
  templateUrl: './notification-element.component.html',
  styleUrls: ['./notification-element.component.scss']
})
export class NotificationElementComponent implements OnInit {
t:number ;
CONFIRM_DEMANDE_RECHARGE_SOUS_COMPTE: boolean;
VALID_DEMANDE_RECHARGE_SOUS_COMPTE: boolean;

  constructor( private home :HomePageComponent,private Authentication: AuthenticationServiceService) {
    this.t=this.home.t+1;
  }

  
 compensation: boolean;
 souscompte: boolean;
 complementaire: boolean;
 quotamensuel: boolean;
 maintenance: boolean;
  ngOnInit(): void {
    this.t=this.home.t+1;
    this.compensation=this.home.compensation;
    this.souscompte=this.home.souscompte;
    this.complementaire=this.home.complementaire;
    this.quotamensuel=this.home.quotamensuel;
    this.maintenance=this.home.maintenance;
  }

  notifCompensation(){
  this.home.compensation=false;
  }
notifMaintenance(){
  this.home.maintenance=false;
}

notifQuotaMensuel(){
  this.home.quotamensuel=false;
}

notifComplementaire(){
  this.home.complementaire=false;
}

notifSousCompte(){
  this.home.souscompte=false;
}
  setDisplayedColumns() {
    this.CONFIRM_DEMANDE_RECHARGE_SOUS_COMPTE = this.Authentication.authoritiesUtilisateur.CONFIRM_DEMANDE_RECHARGE_SOUS_COMPTE;
    this.VALID_DEMANDE_RECHARGE_SOUS_COMPTE = this.Authentication.authoritiesUtilisateur.VALID_DEMANDE_RECHARGE_SOUS_COMPTE;

  }
}
