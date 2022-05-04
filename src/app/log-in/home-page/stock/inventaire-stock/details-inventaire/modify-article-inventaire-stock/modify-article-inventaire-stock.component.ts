import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReferentielGeneraleServiceService } from 'src/app/log-in/home-page/referentiel/general/referentiel-generale-service.service';
import { ReferentielSpecifiqueServiceService } from 'src/app/log-in/home-page/referentiel/specifique/referentiel-specifique-service.service';
import { UpdateArticleForInventaire } from './UpdateArticleForInventaire';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-modify-article-inventaire-stock',
  templateUrl: './modify-article-inventaire-stock.component.html',
  styleUrls: ['./modify-article-inventaire-stock.component.scss'],
  providers: [MatSnackBar]

})
export class ModifyArticleInventaireStockComponent implements OnInit {

  modifiedArticle: UpdateArticleForInventaire = {
    id: null,
    quantiteInventaire: null,
    codeArticle: null,
    designation: null,

  };

 
  modifiedArticleForm = new FormGroup({
    quantiteInventaire: new FormControl(null, [Validators.required]),
    codeArticle: new FormControl(null, [Validators.required]),
    designation: new FormControl(null, [Validators.required]),

  });

  constructor(public dialogRef: MatDialogRef<ModifyArticleInventaireStockComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private ReferentielGenerale: ReferentielGeneraleServiceService, private ReferentielSpecifique: ReferentielSpecifiqueServiceService, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    console.log(this.data.element);
    this.modifiedArticleForm.controls.quantiteInventaire.patchValue(data.element.quantiteInventaire);
    this.modifiedArticleForm.controls.codeArticle.patchValue(data.element.codeArticle);
    this.modifiedArticleForm.controls.designation.patchValue(data.element.designation);
    this.ngxLoader.stop();
  }
 
    ngOnInit(): void {
 
  }
 
  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedArticleForm.valid) {
      this.modifiedArticle = {
        id: this.data.element.id,
        quantiteInventaire: this.modifiedArticleForm.value.quantiteInventaire,
        designation: this.modifiedArticleForm.value.designation,
        codeArticle: this.modifiedArticleForm.value.codeArticle,
      };
      this.dialogRef.close(this.modifiedArticle);
    }
  }

}
