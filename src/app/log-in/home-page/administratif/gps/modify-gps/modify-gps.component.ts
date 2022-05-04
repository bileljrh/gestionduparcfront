import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GpsTableData} from '../gps-table-data';

@Component({
  selector: 'app-modify-gps',
  templateUrl: './modify-gps.component.html',
  styleUrls: ['./modify-gps.component.scss']
})
export class ModifyGPSComponent {
  modifiedGps: GpsTableData = {
    id: null,
    codeIMEI: '',
    lien: '',
  };
  modifiedGpsForm = new FormGroup({
    codeIMEI: new FormControl(null, Validators.required),
    lien: new FormControl(null, Validators.required),
  });

  constructor(public dialogRef: MatDialogRef<ModifyGPSComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    this.modifiedGpsForm.controls.codeIMEI.patchValue(data.element.codeIMEI);
    this.modifiedGpsForm.controls.lien.patchValue(data.element.lien);
  }

  onConfirm() {
    if (this.modifiedGpsForm.valid) {
      this.modifiedGps = {
        id: this.data.element.id,
        codeIMEI: this.modifiedGpsForm.value.codeIMEI,
        lien: this.modifiedGpsForm.value.lien,
      };
      this.dialogRef.close(this.modifiedGps);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }


}
