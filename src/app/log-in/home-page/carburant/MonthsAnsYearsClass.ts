import {ListMonthsAndYears} from './list-months-and-years';
import {Injectable} from '@angular/core';


@Injectable({providedIn: 'root'})
export class MonthsAnsYearsClass {
  listMonthsAndYears: ListMonthsAndYears[] = [];
  emptyMonthsAndYears: ListMonthsAndYears = {
    id: 0,
    numericFormat: '',
    stringFormat: ''
  };
  listOfMonths = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  constructor() {
  }

  getListMonthsAndYears() {
    const year = new Date().getFullYear();
    let id = 1;
    for (let i = (year - 10); i < (year + 10); i++) {
      this.listOfMonths.forEach((value, index) => {
        this.emptyMonthsAndYears.id = id;
        this.emptyMonthsAndYears.stringFormat = String(value) + '-' + String(i);
        if (index < 9) {
          this.emptyMonthsAndYears.numericFormat = String(i) + '-0' + String(index + 1) + '-01';
        } else {
          this.emptyMonthsAndYears.numericFormat = String(i) + '-' + String(index + 1) + '-01';
        }
        this.listMonthsAndYears.push(this.emptyMonthsAndYears);
        id++;
        this.emptyMonthsAndYears = {
          id: 0,
          numericFormat: '',
          stringFormat: ''
        };
      });
    }
    return this.listMonthsAndYears;
  }

}
