import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-read-more-historique-affectation-carte-jocker',
  templateUrl: './read-more-historique-affectation-carte-jocker.component.html',
  styleUrls: ['./read-more-historique-affectation-carte-jocker.component.scss']
})
export class ReadMoreHistoriqueAffectationCarteJockerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ReadMoreHistoriqueAffectationCarteJockerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
