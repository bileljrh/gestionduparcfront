import { Component, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StockServiceService } from '../../stock-service.service';
import { RegulationArticleStock } from '../../RegulationArticleStock';


@Component({
  selector: 'app-details-regulation-stock',
  templateUrl: './details-regulation-stock.component.html',
  styleUrls: ['./details-regulation-stock.component.scss'],
  providers: [MatSnackBar]
})
export class DetailsRegulationStockComponent {
  regulation: RegulationArticleStock = new RegulationArticleStock();

  snackBarSuccesModificationMsg = 'L\'article sélectionné a été modifié avec succès';
  snackBarFailureModificationMsg = 'L\'articlesélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';

  regulationForm = new FormGroup({
    'observationForm': new FormControl(null),
  
  });

  modificarionRegulation: RegulationArticleStock = {
    id: null,
    observation: '',
    creationDate: null,
    quantite_modifier: null,
    codeArticle: '',
    type_mouvement: '',

  };
  displayNotification(notification: string) {
    setTimeout(() => {
      this.snackBar.open(notification, 'X', { duration: 3000 });
    }, 800);
  }
  constructor ( public dialogRef: MatDialogRef<DetailsRegulationStockComponent>, private stockServiceService: StockServiceService, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.ngxLoader.start();
    this.patchInitialValues();
    console.log(data);
    this.ngxLoader.stop();
  }

  onCancel() {
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.regulationForm.valid) {
      this.regulation = {
        id: this.data.element.id,
        observation: this.regulationForm.value.observationForm,
      };
      console.log(this.regulation)
      this.dialogRef.close(this.regulation);
    }
  }

  patchInitialValues() {
    this.regulationForm.controls.observationForm.patchValue(this.data.element.observation);

  }

}
