import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterNode'
})
export class FilterNodePipe implements PipeTransform {

  chckedStr: string[] = ['administratif#', 'exploitation#', 'ordres_de_mission#', 'carburant#', 'carburant_carte_plafond#', 'carburant_carte_agilis_cash#', 'achat#', 'caa#', 'stock#', 'maintenance_et_réparation#', 'reférentiel#', 'reférentiel_général#', 'reférentiel_spécifique#', 'administration#'];
  newVal: string;

  transform(value: string): string {
    this.newVal = value;
    for (let i = 0; i < this.chckedStr.length; i++) {
      if (value.indexOf(this.chckedStr[i]) !== -1) {
        this.newVal = value.replace(this.chckedStr[i], '');
      }
    }
    return this.newVal;
  }


}
