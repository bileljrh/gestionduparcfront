import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartePlafond } from '../../carte-plafond/carte-plafond';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class HistoriqueRechargeCompensationModule {

  
  id?: number;
  quantiteDemande?: number;
  observation?: String;
  matricule?: String;
  mission?: String;
  destination?: String;
 }
