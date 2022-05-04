import {Component, OnInit, ViewChild} from '@angular/core';
import { DemandeQuotaCarteJockerService } from '../demande-quota-carte-jocker.service';
import { DemandeQuotaCarteJocker } from '../DemandeQuotaCarteJocker';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {MatDialogRef} from '@angular/material/dialog';
import { CarteJockerDataResponseList } from '../../../gestion-cartes/gestion-cartes-jocker/carte-jocker-data-response-list';
import { PaginationConfiguration } from 'src/app/log-in/home-page/pagination-configuration';
import { CarteJockerServiceService } from '../../carte-jocker-service.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-create-demande-quota-carte-jocker',
  templateUrl: './create-demande-quota-carte-jocker.component.html',
  styleUrls: ['./create-demande-quota-carte-jocker.component.scss'],
  providers: [MatSnackBar]

})
export class CreateDemandeQuotaCarteJockerComponent implements OnInit {

  demandeQuotaCarteJockers: DemandeQuotaCarteJocker[] = [];
  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  demandeQuotaCarteJocker: DemandeQuotaCarteJocker = new DemandeQuotaCarteJocker();
 
  carteJockerList: CarteJockerDataResponseList[] = [];
  etatCarteActuel: string;
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
  };
  demandeQuotaCarteJockerForm = new FormGroup({
    'typeCarburantForm': new FormControl(null),
    'demandeurForm': new FormControl(null),
    'causeDeBlocageForm': new FormControl(null),
    'quantiteDemandeForm': new FormControl(null), 
    'dateDemandeForm': new FormControl(null),
    'numCarteForm': new FormControl(null), 
  });
  numCarte: number ; 
  itemPerPage = new FormControl(null);
  @ViewChild(MatSort) sort: MatSort;
  constructor( private carteJockerServiceService: CarteJockerServiceService, private  demandeQuotaCarteJockerService: DemandeQuotaCarteJockerService , private router: Router, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService, public dialogRef: MatDialogRef<CreateDemandeQuotaCarteJockerComponent>) {
    this.ngxLoader.start();
    this.ngxLoader.stop();
  }

  ngOnInit(): void {
    this.carteJockerServiceService.getAllCarteJockerTabDataResponses().subscribe(value1 => {
             console.log(value1);
      this.carteJockerList = value1;
    });

    this.demandeQuotaCarteJockerForm.controls.numCarteForm.valueChanges.subscribe(value => {
      console.log(value);
      this.demandeQuotaCarteJocker.typeCarburant = value.typeCarburant;
    });
 
}

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancelAdding() {
    this.dialogRef.close();
  }

  onConfirmAdding() {
    if (this.demandeQuotaCarteJockerForm.valid) {
 
      console.log(this.demandeQuotaCarteJocker);
      this.dialogRef.close({
        numCarte: this.demandeQuotaCarteJockerForm.value.numCarteForm.numeroCarte,
        typeCarburant: this.demandeQuotaCarteJockerForm.value.typeCarburantForm,
        demandeur: this.demandeQuotaCarteJockerForm.value.demandeurForm,
        causeDeBlocage: this.demandeQuotaCarteJockerForm.value.causeDeBlocageForm,
        quantiteDemande: this.demandeQuotaCarteJockerForm.value.quantiteDemandeForm,
        dateDemande: this.demandeQuotaCarteJockerForm.value.dateDemandeForm,
      });

    }
  }

  displayNotification(notification: string) {
    setTimeout(() => {
      this.snackBar.open(notification, 'X', {duration: 3000});
    }, 800);
  }


}
