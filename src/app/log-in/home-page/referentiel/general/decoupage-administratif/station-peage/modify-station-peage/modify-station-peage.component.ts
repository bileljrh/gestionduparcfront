import {Component, Inject} from '@angular/core';
import {Gouvernorat} from '../../gouvernorat';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modify-station-peage',
  templateUrl: './modify-station-peage.component.html',
  styleUrls: ['./modify-station-peage.component.scss']
})
export class ModifyStationPeageComponent {

  modifiedStationPeage: Gouvernorat = {id: null, designation: ''};
  designationControl = new FormControl(null, [Validators.required]);

  constructor(public dialogRef: MatDialogRef<ModifyStationPeageComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.designationControl.patchValue(this.data.element.designation);
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.designationControl.valid) {
      this.modifiedStationPeage = {
        id: this.data.element.id,
        designation: this.designationControl.value
      };
      this.dialogRef.close(this.modifiedStationPeage);
    }
  }
}
