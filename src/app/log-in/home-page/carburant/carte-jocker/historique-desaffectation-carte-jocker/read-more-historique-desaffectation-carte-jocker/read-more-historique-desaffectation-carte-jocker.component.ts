import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-read-more-historique-desaffectation-carte-jocker',
  templateUrl: './read-more-historique-desaffectation-carte-jocker.component.html',
  styleUrls: ['./read-more-historique-desaffectation-carte-jocker.component.scss']
})
export class ReadMoreHistoriqueDesaffectationCarteJockerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ReadMoreHistoriqueDesaffectationCarteJockerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
