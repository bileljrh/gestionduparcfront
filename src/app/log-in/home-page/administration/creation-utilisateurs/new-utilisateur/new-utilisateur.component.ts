import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ReferentielSpecifiqueServiceService} from '../../../referentiel/specifique/referentiel-specifique-service.service';
import {StructureUgpMagasin} from '../structure-ugp-magasin';
import {AdministrationServiceService} from '../../administration-service.service';
import {MagasinUGP} from '../magasin-ugp';
import {NewUtilisateur} from '../new-utilisateur';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-utilisateur',
  templateUrl: './new-utilisateur.component.html',
  styleUrls: ['./new-utilisateur.component.scss']
})
export class NewUtilisateurComponent implements OnDestroy {
  subscription: Subscription[] = [];
  listStructureUgpMagasin: StructureUgpMagasin[] = [];
  listMagasinUGP: MagasinUGP[] = [];
  TypeCompte: string[] = ['Utilisateur', 'Administrateur'];
  newUtilisateurForm = new FormGroup({
    nom: new FormControl(null, Validators.required),
    prenom: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    matricule: new FormControl(null, Validators.required),
    mot2passe: new FormControl(null, Validators.required),
    repeatMot2passe: new FormControl(null, Validators.required),
    typeCompte: new FormControl(null, Validators.required),
    parc: new FormControl(null),
    structure: new FormControl(null),
    magasin: new FormControl(null),
    ordre: new FormControl(null)
  }, {
    validators: this.password.bind(this)
  });
  get f() { return this.newUtilisateurForm.controls; }
  newUtilisateur: NewUtilisateur = {
    nom: '',
    prenom: '',
    email: '',
    matricule: '',
    mot2passe: '',
    idUgp: null,
    idStructure: null,
    idMagasin: null,
    ordre: null,
    typeCompte: null,
    idRole: null 
  };
  codeUgp = '';
  codeStructure = '';
  codeMagasin = '';

  constructor(public dialogRef: MatDialogRef<NewUtilisateurComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Referentiel: ReferentielSpecifiqueServiceService, private Administration: AdministrationServiceService) {
    this.subscription.push(this.Administration.getListStructureUgpMagasin().subscribe(value => {
      this.listStructureUgpMagasin = value;
    }));
    this.subscription.push(this.newUtilisateurForm.controls.structure.valueChanges.subscribe(value => {
      if (value === undefined) {
        this.newUtilisateurForm.controls.parc.reset(null, {emitEvent: false});
        this.newUtilisateurForm.controls.magasin.reset(null, {emitEvent: false});
        this.codeUgp = '';
        this.codeStructure = '';
        this.listMagasinUGP = [];
        this.codeMagasin = '';
      } else {
        this.newUtilisateurForm.controls.parc.patchValue(value, {emitEvent: false});
        this.newUtilisateurForm.controls.magasin.patchValue(value, {emitEvent: false});
        this.codeUgp = value.codeUgp;
        this.codeStructure = value.codeStructure;
        this.listMagasinUGP = value.magasins;
        this.codeMagasin = '';
      }
    }));
    this.subscription.push(this.newUtilisateurForm.controls.parc.valueChanges.subscribe(value => {
      if (value === undefined) {
        this.newUtilisateurForm.controls.magasin.reset(null, {emitEvent: false});
        this.codeUgp = '';
        this.codeStructure = '';
        this.listMagasinUGP = [];
        this.codeMagasin = '';
      } else {
        this.newUtilisateurForm.controls.structure.patchValue(value, {emitEvent: false});
        this.newUtilisateurForm.controls.magasin.patchValue(value, {emitEvent: false});
        this.codeUgp = value.codeUgp;
        this.codeStructure = value.codeStructure;
        this.listMagasinUGP = value.magasins;
        this.codeMagasin = '';
      }
    }));
    this.subscription.push(this.newUtilisateurForm.controls.magasin.valueChanges.subscribe(value => {
      if (value === undefined) {
        this.codeMagasin = '';
      } else {
        this.codeMagasin = value.codeMagasin;
      }
    }));
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.newUtilisateurForm.valid) {
      this.newUtilisateur.nom = this.newUtilisateurForm.value.nom;
      this.newUtilisateur.prenom = this.newUtilisateurForm.value.prenom;
      this.newUtilisateur.email = this.newUtilisateurForm.value.email;
      this.newUtilisateur.matricule = this.newUtilisateurForm.value.matricule;
      this.newUtilisateur.mot2passe = this.newUtilisateurForm.value.mot2passe;
      this.newUtilisateur.ordre = null;
      this.newUtilisateur.typeCompte = this.newUtilisateurForm.value.typeCompte;
      if (this.newUtilisateurForm.value.structure === undefined) {
        this.newUtilisateur.idStructure = null;
      } else if (this.newUtilisateurForm.value.structure === null) {
        this.newUtilisateur.idStructure = null;
      } else {
        this.newUtilisateur.idStructure = this.newUtilisateurForm.value.structure.idStructure;
      }
      if (this.newUtilisateurForm.value.parc === undefined) {
        this.newUtilisateur.idUgp = null;
      } else if (this.newUtilisateurForm.value.parc === null) {
        this.newUtilisateur.idUgp = null;
      } else {
        this.newUtilisateur.idUgp = this.newUtilisateurForm.value.parc.idUgp;
      }
      if (this.newUtilisateurForm.value.magasin === undefined) {
        this.newUtilisateur.idMagasin = null;
      } else if (this.newUtilisateurForm.value.magasin === null) {
        this.newUtilisateur.idMagasin = null;
      } else {
        this.newUtilisateur.idMagasin = this.newUtilisateurForm.value.magasin.idMagasin;
      }
      if (this.newUtilisateur.typeCompte == "Utilisateur")
      { this.newUtilisateur.idRole = 156 ; }
      if (this.newUtilisateur.typeCompte == "Administrateur")
      { this.newUtilisateur.idRole = 1 ; }

      console.log(this.newUtilisateur);
      this.dialogRef.close(this.newUtilisateur);
    }
  }

  password(formGroup: FormGroup) {
    const {value: password} = formGroup.get('mot2passe');
    const {value: confirmPassword} = formGroup.get('repeatMot2passe');
    return password === confirmPassword ? null : {passwordNotMatch: true};
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }

}
