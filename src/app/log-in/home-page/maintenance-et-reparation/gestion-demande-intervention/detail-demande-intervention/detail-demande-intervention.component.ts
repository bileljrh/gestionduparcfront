import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Vehicule {
  name: string;
}

@Component({
  selector: 'app-detail-demande-intervention',
  templateUrl: './detail-demande-intervention.component.html',
  styleUrls: ['./detail-demande-intervention.component.scss']
})
export class DetailDemandeInterventionComponent implements OnInit {
  UGP: string[] = ['UGP 1', 'UGP 2', 'UGP 3', 'UGP 4', 'UGP 5', 'UGP 6', 'UGP 7'];
  myControl = new FormControl();
  options: Vehicule[] = [
    {name: '17-350'},
    {name: '17-620'},
    {name: '17-110'},
    {name: '17-130'},
    {name: '17-962'},
    {name: '17-023'},
    {name: '17-369'}
  ];
  filteredOptions: Observable<Vehicule[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(user: Vehicule): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Vehicule[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
