import {Component, Inject, OnDestroy} from '@angular/core';
import {Gouvernorat} from '../../decoupage-administratif/gouvernorat';
import {LieuParking} from '../lieu-parking';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ReferentielGeneraleServiceService} from '../../referentiel-generale-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-modify-lieu-parking',
  templateUrl: './modify-lieu-parking.component.html',
  styleUrls: ['./modify-lieu-parking.component.scss']
})
export class ModifyLieuParkingComponent implements OnDestroy {

  ListGouvernorat: Gouvernorat[] = [];
  modifiedLieuParking: LieuParking = {id: null, adresse: '', code: '', gouvernorat: undefined};
  subscription: Subscription[] = [];
  modifiedLieuParkingForm = new FormGroup({
    adresse: new FormControl(null, Validators.required),
    code: new FormControl(null, Validators.required),
    gouvernorat: new FormControl(null, Validators.required)
  });

  constructor(public dialogRef: MatDialogRef<ModifyLieuParkingComponent>, private Referentiel: ReferentielGeneraleServiceService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.subscription.push(this.Referentiel.getListGouvernorat().subscribe(value => {
      this.ListGouvernorat = value;
      this.ListGouvernorat.forEach(value1 => {
        if (value1.id === data.element.gouvernorat.id) {
          this.modifiedLieuParkingForm.controls.gouvernorat.patchValue(value1);
        }
      });
    }));
    this.modifiedLieuParkingForm.controls.adresse.patchValue(data.element.adresse);
    this.modifiedLieuParkingForm.controls.code.patchValue(data.element.code);
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedLieuParkingForm.valid) {
      this.modifiedLieuParking = {
        id: this.data.element.id,
        adresse: this.modifiedLieuParkingForm.value.adresse,
        code: this.modifiedLieuParkingForm.value.code,
        gouvernorat: this.modifiedLieuParkingForm.value.gouvernorat
      };
      this.dialogRef.close(this.modifiedLieuParking);
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }

}
