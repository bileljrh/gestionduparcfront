import {Component} from '@angular/core';
import {SelectVehicule} from '../../vehicules/select-vehicule';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdministratifServiceService} from '../../administratif-service.service';
import {MatDialogRef} from '@angular/material/dialog';
import {GpsTableData} from '../gps-table-data';

@Component({
  selector: 'app-new-gps',
  templateUrl: './new-gps.component.html',
  styleUrls: ['./new-gps.component.scss']
})
export class NewGPSComponent {
  newGps: GpsTableData = {
    codeIMEI: '',
    lien: '',
  };
  ListVehicules: SelectVehicule[] = [];
  newGpsForm = new FormGroup({
    codeIMEI: new FormControl(null, Validators.required),
    lien: new FormControl(null, Validators.required),
    numeroPlaque: new FormControl(null, Validators.required)
  });
  get f() { return this.newGpsForm.controls; }

  constructor(private Administratif: AdministratifServiceService, public dialogRef: MatDialogRef<NewGPSComponent>) {
    this.Administratif.getSelectVehiculeByStrucutureForGPS().subscribe(value => {
      this.ListVehicules = value;
    });
  }

  onConfirm() {
    if (this.newGpsForm.valid) {
      this.newGps = {
        codeIMEI: this.newGpsForm.value.codeIMEI,
        lien: this.newGpsForm.value.lien,
      };
      this.dialogRef.close({gps: this.newGps, id: this.newGpsForm.value.numeroPlaque});
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

}
