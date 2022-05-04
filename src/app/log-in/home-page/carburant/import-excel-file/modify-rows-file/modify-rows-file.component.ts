import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypeCarte } from '../type.enum';
import { TypeTransaction } from '../TypeTransaction.enum';

@Component({
  selector: 'app-modify-rows-file',
  templateUrl: './modify-rows-file.component.html',
  styleUrls: ['./modify-rows-file.component.scss']
})
export class ModifyRowsFileComponent implements OnInit {

  typekeysCarte: TypeCarte[];
  typeTransaction: TypeTransaction[];

  keys = Object.keys;
  symbols = TypeCarte;


  keys2 = Object.keys;
  symbols2 = TypeTransaction;

  constructor(public dialogRef: MatDialogRef<ModifyRowsFileComponent>) {
    console.log("keys");
    console.log(this.keys);
    console.log("type carte");
    console.log(this.symbols);



  }

  ngOnInit(): void {

  }

  onConfirm() {

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

}
