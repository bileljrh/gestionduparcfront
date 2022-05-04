import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {LieuParking} from '../lieu-parking';
import {Gouvernorat} from '../../decoupage-administratif/gouvernorat';
import {ReferentielGeneraleServiceService} from '../../referentiel-generale-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-lieu-parking',
  templateUrl: './new-lieu-parking.component.html',
  styleUrls: ['./new-lieu-parking.component.scss']
})
export class NewLieuParkingComponent implements OnDestroy {
  ListGouvernorat: Gouvernorat[] = [];
  newLieuParking: LieuParking = {adresse: '', code: '', gouvernorat: undefined};
  newLieuParkingForm = new FormGroup({
    adresse: new FormControl(null, Validators.required),
    code: new FormControl(null, Validators.required),
    gouvernorat: new FormControl(null, Validators.required)
  });
  get f() { return this.newLieuParkingForm.controls; }
  subscription: Subscription[] = [];

  constructor(public dialogRef: MatDialogRef<NewLieuParkingComponent>, private Referentiel: ReferentielGeneraleServiceService) {
    this.subscription.push(this.Referentiel.getListGouvernorat().subscribe(value => {
      this.ListGouvernorat = value;
    }));
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.newLieuParkingForm.valid) {
      this.newLieuParking = {
        adresse: this.newLieuParkingForm.value.adresse,
        code: this.newLieuParkingForm.value.code,
        gouvernorat: this.newLieuParkingForm.value.gouvernorat
      };
      this.dialogRef.close(this.newLieuParking);
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }

}
