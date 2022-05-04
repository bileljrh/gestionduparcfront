import {Component, Inject, OnInit} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PdfViewerComponent} from 'ng2-pdf-viewer';

@Component({
  selector: 'app-read-vehicule-document',
  templateUrl: './read-vehicule-document.component.html',
  styleUrls: ['./read-vehicule-document.component.scss'],
  providers: [PdfViewerComponent]
})
export class ReadVehiculeDocumentComponent implements OnInit {
  source: any;

  constructor(public dialogRef: MatDialogRef<ReadVehiculeDocumentComponent>, private ngxLoader: NgxUiLoaderService, @Inject(MAT_DIALOG_DATA) public data) {
    this.source = data.src;
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
