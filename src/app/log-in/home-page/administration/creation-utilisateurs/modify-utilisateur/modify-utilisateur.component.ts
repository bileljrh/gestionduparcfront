import {Component, Inject, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {StructureUgpMagasin} from '../structure-ugp-magasin';
import {MagasinUGP} from '../magasin-ugp';
import {AdministrationServiceService} from '../../administration-service.service';
import {NewUtilisateur} from '../new-utilisateur';
import {Subscription} from 'rxjs';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-modify-utilisateur',
  templateUrl: './modify-utilisateur.component.html',
  styleUrls: ['./modify-utilisateur.component.scss']
})
export class ModifyUtilisateurComponent implements OnDestroy {
  subscription: Subscription[] = [];
  TypeCompte: string[] = ['Utilisateur', 'Administrateur'];
  listStructureUgpMagasin: StructureUgpMagasin[] = [];
  listMagasinUGP: MagasinUGP[] = [];
  modifiedUtilisateur: NewUtilisateur = {
    email: '',
    id: 0,
    idMagasin: 0,
    idUgp: 0,
    idStructure: 0,
    matricule: '',
    nom: '',
    ordre: 0,
    prenom: ''
  };
  modifiedUtilisateurForm = new FormGroup({
    nom: new FormControl(null, Validators.required),
    prenom: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    matricule: new FormControl(null, Validators.required),
    ordre: new FormControl(null, Validators.required),
    typeCompte: new FormControl(null, Validators.required),
    parc: new FormControl(null),
    structure: new FormControl(null),
    magasin: new FormControl(null),
  });
  codeUgp = '';
  codeStructure = '';
  codeMagasin = '';


  constructor(public dialogRef: MatDialogRef<ModifyUtilisateurComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Administration: AdministrationServiceService, private ngxLoader: NgxUiLoaderService) {
    this.ngxLoader.start();
    this.subscription.push(this.modifiedUtilisateurForm.controls.structure.valueChanges.subscribe(value => {
     console.log("test patch value");
     console.log(value);
     
     
      if (value === undefined) {
        this.modifiedUtilisateurForm.controls.parc.reset(null, {emitEvent: false});
        this.modifiedUtilisateurForm.controls.magasin.reset(null, {emitEvent: false});
        this.codeUgp = '';
        this.codeStructure = '';
        this.listMagasinUGP = [];
        this.codeMagasin = '';
      } else {
        this.modifiedUtilisateurForm.controls.parc.patchValue(value, {emitEvent: false});
        this.modifiedUtilisateurForm.controls.magasin.patchValue(value, {emitEvent: false});
        this.codeUgp = value.codeUgp;
        this.codeStructure = value.codeStructure;
        this.listMagasinUGP = value.magasins;
        this.codeMagasin = '';
      }
    }));
    this.subscription.push(this.modifiedUtilisateurForm.controls.parc.valueChanges.subscribe(value => {
      if (value === undefined) {
        this.modifiedUtilisateurForm.controls.magasin.reset(null, {emitEvent: false});
        this.codeUgp = '';
        this.codeStructure = '';
        this.listMagasinUGP = [];
        this.codeMagasin = '';
      } else {
        this.modifiedUtilisateurForm.controls.structure.patchValue(value, {emitEvent: false});
        this.modifiedUtilisateurForm.controls.magasin.patchValue(value, {emitEvent: false});
        this.codeUgp = value.codeUgp;
        this.codeStructure = value.codeStructure;
        this.listMagasinUGP = value.magasins;
        this.codeMagasin = '';
      }
    }));
    this.subscription.push(this.modifiedUtilisateurForm.controls.magasin.valueChanges.subscribe(value => {
      if (value === undefined) {
        this.codeMagasin = '';
      } else {
        this.codeMagasin = value.codeMagasin;
      }
    }));
    this.subscription.push(this.Administration.getListStructureUgpMagasin().subscribe(value => {
      this.listStructureUgpMagasin = value;
      if (!(data.element.structures === undefined || data.element.structures.length === 0)) {
        this.listStructureUgpMagasin.forEach(value1 => {
          if (value1.idStructure === data.element.structures[0].id) {
            this.modifiedUtilisateurForm.controls.structure.patchValue(value1, {emitEvent: false});
            this.codeStructure = value1.codeStructure;
            this.listMagasinUGP = value1.magasins;
            if (!(data.element.ugps === undefined || data.element.ugps.length === 0)) {
              if (data.element.ugps[0].id === value1.idUgp) {
                this.modifiedUtilisateurForm.controls.parc.patchValue(value1, {emitEvent: false});
                this.codeUgp = value1.codeUgp;
              }
            } else {
              this.modifiedUtilisateurForm.controls.parc.patchValue(null, {emitEvent: false});
            }
            if (!(data.element.magasins === undefined || data.element.magasins === 0)) {
              value1.magasins.forEach(value2 => {
                if (value2.idMagasin === data.element.magasins[0].id) {
                  this.modifiedUtilisateurForm.controls.magasin.patchValue(value2);
                  this.codeMagasin = value2.codeMagasin;
                }
              });
            }
          } else {
          }
        });
      }
    }));
    this.modifiedUtilisateurForm.controls.nom.patchValue(data.element.nom);
    this.modifiedUtilisateurForm.controls.prenom.patchValue(data.element.prenom);
    this.modifiedUtilisateurForm.controls.email.patchValue(data.element.email);
    this.modifiedUtilisateurForm.controls.matricule.patchValue(data.element.matricule);
    this.modifiedUtilisateurForm.controls.ordre.patchValue(data.element.ordre);
    this.modifiedUtilisateurForm.controls.typeCompte.patchValue(data.element.typeCompte);
    this.ngxLoader.stop();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
    this.listStructureUgpMagasin.forEach(value => {

    });
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedUtilisateurForm.valid) {
      this.modifiedUtilisateur.id = this.data.element.id;
      this.modifiedUtilisateur.nom = this.modifiedUtilisateurForm.value.nom;
      this.modifiedUtilisateur.prenom = this.modifiedUtilisateurForm.value.prenom;
      this.modifiedUtilisateur.email = this.modifiedUtilisateurForm.value.email;
      this.modifiedUtilisateur.matricule = this.modifiedUtilisateurForm.value.matricule;
      this.modifiedUtilisateur.mot2passe = this.modifiedUtilisateurForm.value.mot2passe;
      this.modifiedUtilisateur.ordre = this.modifiedUtilisateurForm.value.ordre;
      this.modifiedUtilisateur.typeCompte = this.modifiedUtilisateurForm.value.typeCompte;
      if (this.modifiedUtilisateurForm.value.structure === undefined) {
        this.modifiedUtilisateur.idStructure = null;
      } else if (this.modifiedUtilisateurForm.value.structure === null) {
        this.modifiedUtilisateur.idStructure = null;
      } else {
        this.modifiedUtilisateur.idStructure = this.modifiedUtilisateurForm.value.structure.idStructure;
      }
      if (this.modifiedUtilisateurForm.value.parc === undefined) {
        this.modifiedUtilisateur.idUgp = null;
      } else if (this.modifiedUtilisateurForm.value.parc === null) {
        this.modifiedUtilisateur.idUgp = null;
      } else {
        this.modifiedUtilisateur.idUgp = this.modifiedUtilisateurForm.value.parc.idUgp;
      }
      if (this.modifiedUtilisateurForm.value.magasin === undefined) {
        this.modifiedUtilisateur.idMagasin = null;
      } else if (this.modifiedUtilisateurForm.value.magasin === null) {
        this.modifiedUtilisateur.idMagasin = null;
      } else {
        this.modifiedUtilisateur.idMagasin = this.modifiedUtilisateurForm.value.magasin.idMagasin;
      }
      this.dialogRef.close(this.modifiedUtilisateur);
    }
  }

}
