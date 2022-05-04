import {Component, Inject, OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Structure} from '../../../referentiel/specifique/structure-administrative/structure';
import {Utilisateur} from '../../creation-utilisateurs/utilisateur';
import {AdministrationServiceService} from '../../administration-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ReferentielSpecifiqueServiceService} from '../../../referentiel/specifique/referentiel-specifique-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-assign-user',
  templateUrl: './assign-user.component.html',
  styleUrls: ['./assign-user.component.scss']
})
export class AssignUserComponent implements OnDestroy {
  subscription: Subscription[] = [];
  structure = 'tousStructures';
  ListStructure: Structure[] = [];
  ListUtilisateur: Utilisateur[] = [];
  ListUtilisateurGroupe: Utilisateur[] = [];
  ListMatriculeUtilisateurGroupe: string[] = [];
  structureControl = new FormControl(null);
  utilisateurControl = new FormControl(null);
  codeStructure = '';
  matriculeUtilisateur = '';

  constructor(public dialogRef: MatDialogRef<AssignUserComponent>, private Administration: AdministrationServiceService, private ngxLoader: NgxUiLoaderService, private Referentiel: ReferentielSpecifiqueServiceService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.ngxLoader.start();
    this.ListUtilisateurGroupe = data.element.users;
    this.subscription.push(this.Referentiel.getListStructure().subscribe(value => {
      this.ListStructure = value;
    }));
    this.subscription.push(this.structureControl.valueChanges.subscribe(value => {
      if (value === undefined) {
        this.codeStructure = '';
        this.structure = 'tousStructures';
      } else {
        this.structure = value.designation;
        this.codeStructure = value.code;
      }
      this.matriculeUtilisateur = '';
      this.utilisateurControl.reset(null);
      this.ListUtilisateur = [];
      this.Administration.getListUtilisateur(this.structure).subscribe(value1 => {
        this.ListUtilisateur = value1;
      });
    }));
    this.subscription.push(this.utilisateurControl.valueChanges.subscribe(value => {
      if ((value === undefined) || (value === null)) {
        this.matriculeUtilisateur = '';
      } else {
        this.matriculeUtilisateur = value.matricule;
      }
    }));
    this.ngxLoader.stop();
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.ListMatriculeUtilisateurGroupe = [];
    this.ListUtilisateurGroupe.forEach(value => {
      this.ListMatriculeUtilisateurGroupe.push(value.matricule);
    });
    this.dialogRef.close(this.ListMatriculeUtilisateurGroupe);
  }


  addNewUtilisateur4Group() {
    if (this.utilisateurControl.value) {
      if (!this.checkUtilisateurExist(this.utilisateurControl.value)) {
        this.ListUtilisateurGroupe.push(this.utilisateurControl.value);
      }
    }
  }

  removeSelectedUtilisateur(utilisateur: Utilisateur) {
    this.ListUtilisateurGroupe.splice(this.ListUtilisateurGroupe.indexOf(utilisateur), 1);
  }


  checkUtilisateurExist(utilisateur: Utilisateur): boolean {
    let exist = false;
    this.ListUtilisateurGroupe.forEach(value => {
      if (utilisateur.id === value.id) {
        exist = true;
      }
    });
    return exist;
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }

}
