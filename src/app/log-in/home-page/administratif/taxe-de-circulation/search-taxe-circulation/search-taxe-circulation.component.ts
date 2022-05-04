import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-search-taxe-circulation',
  templateUrl: './search-taxe-circulation.component.html',
  styleUrls: ['./search-taxe-circulation.component.scss']
})
export class SearchTaxeCirculationComponent {
  parPlaces = true;
  customSearchForm = new FormGroup({
    poidsOrPlaces: new FormControl('Par places'),
  });

  constructor(public dialogRef: MatDialogRef<SearchTaxeCirculationComponent>) {
    this.customSearchForm.controls.poidsOrPlaces.valueChanges.subscribe(value => {
      if (value === 'Par places') {
        this.parPlaces = true;
      } else {
        this.parPlaces = false;
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.dialogRef.close();
  }

}
