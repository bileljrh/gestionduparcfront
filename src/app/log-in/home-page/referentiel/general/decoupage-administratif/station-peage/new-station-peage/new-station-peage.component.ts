import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-new-station-peage',
  templateUrl: './new-station-peage.component.html',
  styleUrls: ['./new-station-peage.component.scss']
})
export class NewStationPeageComponent {

  designationControl = new FormControl(null, [Validators.required]);

  constructor(public dialogRef: MatDialogRef<NewStationPeageComponent>) {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.designationControl.valid) {
      this.dialogRef.close(this.designationControl.value);
    }
  }


}
