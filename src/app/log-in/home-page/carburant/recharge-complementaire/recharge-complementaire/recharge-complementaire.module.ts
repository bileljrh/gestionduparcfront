import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartePlafond } from '../../carte-plafond/carte-plafond';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class RechargeComplementaireModule {

  
  id?: number;
  confirmed?: boolean;
  validated?: boolean;
  quantiteDemande?: number;
  observation?: String;
  matricule?: String;
  cartePlafond?: CartePlafond;

 }
