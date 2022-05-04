import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ParametreApplication} from './parametre-application';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AdministrationServiceService} from '../administration-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {AuthenticationServiceService} from '../../../authentication-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-parametres-application',
  templateUrl: './parametres-application.component.html',
  styleUrls: ['./parametres-application.component.scss'],
  providers: [MatSnackBar]
})
export class ParametresApplicationComponent implements OnDestroy {
  VIEW_PARAMETRES_APPLICATION: boolean;
  ADD_PARAMETRES_APPLICATION: boolean;
  MODIFY_PARAMETRES_APPLICATION: boolean;
  newParametresApplication: ParametreApplication = {ipServeur: '', entete: '', pidesPage: '', port: '', reportServeur: '', societe: ''};
  modifiedParametresApplication: ParametreApplication = {
    id: null,
    ipServeur: '',
    entete: '',
    pidesPage: '',
    port: '',
    reportServeur: '',
    societe: ''
  };
  parametresApplicationForm = new FormGroup({
    societe: new FormControl(null),
    entete: new FormControl(null),
    pieds2Page: new FormControl(null),
    reportServeur: new FormControl(null),
    ipServeur: new FormControl(null),
    port: new FormControl(null)
  });
  nouveauxParametres: boolean;
  subscription: Subscription[] = [];

  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'Les paramètres sélectionnés ont été supprimés avec succès';
  snackBarFailureDeleteMsg = 'Les paramètres sélectionnés ne pourront pas être supprimés, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'Les nouveaux paramètres ont été ajoutés avec succès';
  snackBarFailureAddingMsg = 'Les nouveaux paramètres ne pourront pas être ajoutés, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'Les paramètres sélectionnés ont été modifiés avec succès';
  snackBarFailureModifyingMsg = 'Les paramètres sélectionnés ne pourront pas être modifiés, réessayez de nouveau s\'il vous plait';


  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private Administration: AdministrationServiceService, private ngxLoader: NgxUiLoaderService, private Authentication: AuthenticationServiceService) {
    this.VIEW_PARAMETRES_APPLICATION = this.Authentication.authoritiesUtilisateur.VIEW_PARAMETRES_APPLICATION;
    this.ADD_PARAMETRES_APPLICATION = this.Authentication.authoritiesUtilisateur.ADD_PARAMETRES_APPLICATION;
    this.MODIFY_PARAMETRES_APPLICATION = this.Authentication.authoritiesUtilisateur.MODIFY_PARAMETRES_APPLICATION;
    this.subscription.push(this.Administration.getParametreApplication().subscribe(value => {
      if (value.id === null) {
        this.nouveauxParametres = true;
      } else {
        this.nouveauxParametres = false;
        this.modifiedParametresApplication.id = value.id;
        this.parametresApplicationForm.controls.societe.patchValue(value.societe);
        this.parametresApplicationForm.controls.entete.patchValue(value.entete);
        this.parametresApplicationForm.controls.pieds2Page.patchValue(value.pidesPage);
        this.parametresApplicationForm.controls.reportServeur.patchValue(value.reportServeur);
        this.parametresApplicationForm.controls.ipServeur.patchValue(value.ipServeur);
        this.parametresApplicationForm.controls.port.patchValue(value.port);
      }
    }));
  }


  onCancel() {
    if (this.nouveauxParametres) {
      this.parametresApplicationForm.reset();
    } else {
      this.subscription.push(this.Administration.getParametreApplication().subscribe(value => {
        this.nouveauxParametres = false;
        this.modifiedParametresApplication.id = value.id;
        this.parametresApplicationForm.controls.societe.patchValue(value.societe);
        this.parametresApplicationForm.controls.entete.patchValue(value.entete);
        this.parametresApplicationForm.controls.pieds2Page.patchValue(value.pidesPage);
        this.parametresApplicationForm.controls.reportServeur.patchValue(value.reportServeur);
        this.parametresApplicationForm.controls.ipServeur.patchValue(value.ipServeur);
        this.parametresApplicationForm.controls.port.patchValue(value.port);
      }));
    }
  }

  onConfirm() {
    this.ngxLoader.start();
    if (this.nouveauxParametres) {
      this.newParametresApplication = {
        ipServeur: this.parametresApplicationForm.value.ipServeur,
        entete: this.parametresApplicationForm.value.entete,
        pidesPage: this.parametresApplicationForm.value.pidesPage,
        port: this.parametresApplicationForm.value.port,
        reportServeur: this.parametresApplicationForm.value.reportServeur,
        societe: this.parametresApplicationForm.value.societe
      };
      this.subscription.push(this.Administration.addParametreApplication(this.newParametresApplication).subscribe(value => {
        this.Administration.getParametreApplication().subscribe(value1 => {
          this.modifiedParametresApplication.id = value.id;
          this.parametresApplicationForm.controls.societe.patchValue(value.societe);
          this.parametresApplicationForm.controls.entete.patchValue(value.entete);
          this.parametresApplicationForm.controls.pieds2Page.patchValue(value.pieds2Page);
          this.parametresApplicationForm.controls.reportServeur.patchValue(value.reportServeur);
          this.parametresApplicationForm.controls.ipServeur.patchValue(value.IpServeur);
          this.parametresApplicationForm.controls.port.patchValue(value.port);
        });
        this.ngxLoader.stop();
        this.displayNotification(this.snackBarSuccesAddingMsg);
      }, error => {
        this.ngxLoader.stop();
        this.displayNotification(this.snackBarFailureAddingMsg);
      }));
      this.ngxLoader.stop();
    } else {
      this.modifiedParametresApplication.societe = this.parametresApplicationForm.value.societe;
      this.modifiedParametresApplication.entete = this.parametresApplicationForm.value.entete;
      this.modifiedParametresApplication.pidesPage = this.parametresApplicationForm.value.pieds2Page;
      this.modifiedParametresApplication.reportServeur = this.parametresApplicationForm.value.reportServeur;
      this.modifiedParametresApplication.ipServeur = this.parametresApplicationForm.value.ipServeur;
      this.modifiedParametresApplication.port = this.parametresApplicationForm.value.port;
      this.subscription.push(this.Administration.modifyParametreApplication(this.modifiedParametresApplication).subscribe(value => {
        this.ngxLoader.start();
        this.displayNotification(this.snackBarSuccesModifyingMsg);
        this.ngxLoader.stop();
      }, error => {
        this.ngxLoader.start();
        this.displayNotification(this.snackBarFailureModifyingMsg);
      }));
    }
    this.ngxLoader.stop();
  }

  displayNotification(message: string) {
    setTimeout(() => {
      this.snackBar.open(message, 'X', {duration: 3000});
    }, 800);
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }

}
