import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NouvelleCartePlafond} from '../nouvelle-carte-plafond';
import {SelectVehicule} from '../../../../administratif/vehicules/select-vehicule';
import {CartePlafondServiceService} from '../../../carte-plafond/carte-plafond-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import moment from 'moment';

@Component({
  selector: 'app-nouvelle-carte-plafond',
  templateUrl: './nouvelle-carte-plafond.component.html',
  styleUrls: ['./nouvelle-carte-plafond.component.scss'],
  providers: [MatSnackBar]
})
export class NouvelleCartePlafondComponent implements OnInit {
  nouvelleCartePlafond: NouvelleCartePlafond = {
    idVehicule: null,
    numeroCarte: '',
    montant: 0,
  //  typeCarburant: '',
    dateValiditee: '',
    status:''
  };
  listCarburant:string[]=['Mazout','Essence','Gasoil sans soufre'];
  statusCarte:string[]=['actif','en opposition temporaire','désactivé']
  newCartePlafondForm = new FormGroup({
   // numeroPlaque: new FormControl(null, Validators.required),
   // typeCarburant: new FormControl(null, Validators.required),
    numeroCarte: new FormControl(null, Validators.required),
    montant: new FormControl(null, Validators.required),
    dateValidite: new FormControl(null, Validators.required),
    status:new FormControl(null,Validators.required)
  });
  get f() { return this.newCartePlafondForm.controls; }

  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  listVehicule: SelectVehicule[] = [];
  nomBeneficiaire = '';
  matriculeBeneficiaire = '';
  codeStructure = '';
  designationStructure = '';
  typeCarburant = '';

  constructor(public dialogRef: MatDialogRef<NouvelleCartePlafondComponent>, private CartePlafond: CartePlafondServiceService, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    CartePlafond.getListVehiculeWithNoCartePlafond().subscribe(value => {
      this.listVehicule = value;
    }, error => {
      this.ngxLoader.stop();
      this.showNotification(this.snackBarFailureLoadingMsg);
    });
    this.ngxLoader.stop();
  }

  ngOnInit(): void {
    this.newCartePlafondForm.controls.numeroPlaque.valueChanges.subscribe(value => {
      if (value.nomBeneficiaire !== null) {
        this.nomBeneficiaire = value.nomBeneficiaire;
      } else {
        this.nomBeneficiaire = '';
      }
      if (value.matriculeBeneficiaire !== null) {
        this.matriculeBeneficiaire = value.matriculeBeneficiaire;
      } else {
        this.matriculeBeneficiaire = '';
      }
      this.codeStructure = value.codeStructure;
      this.designationStructure = value.designationStructure;
      this.typeCarburant = value.typeCarburant;
    });
  }

  onCancel() {
    this.dialogRef.close();
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.newCartePlafondForm.valid) {
      this.nouvelleCartePlafond = {
       // idVehicule: this.newCartePlafondForm.value.numeroPlaque.id,
        numeroCarte: this.newCartePlafondForm.value.numeroCarte,
        montant: this.newCartePlafondForm.value.montant,
       // typeCarburant: this.newCartePlafondForm.value.typeCarburant,
        dateValiditee: moment(this.newCartePlafondForm.value.dateValidite as Date).format('YYYY-MM-DD'),
        status:this.newCartePlafondForm.value.status
      };
      console.log(this.nouvelleCartePlafond);
      this.dialogRef.close(this.nouvelleCartePlafond);
    }
  }

  showNotification(notification: string) {
    setTimeout(() => {
      this.snackBar.open(notification, 'X', {duration: 3000});
    }, 800);
  }


}
