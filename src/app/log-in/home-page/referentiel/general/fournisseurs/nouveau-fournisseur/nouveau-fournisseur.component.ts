import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Fournisseur} from '../fournisseur';

@Component({
  selector: 'app-nouveau-fournisseur',
  templateUrl: './nouveau-fournisseur.component.html',
  styleUrls: ['./nouveau-fournisseur.component.scss']
})
export class NouveauFournisseurComponent {
  nouveauFournisseur: Fournisseur = {
    adresse: '',
    banque: '',
    code: '',
    designation: '',
    email: '',
    fax: '',
    rib: '',
    tel: '',
    web: ''
  };
  nouveauFournisseurForm = new FormGroup({
    code: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
    adresse: new FormControl(null),
    tel: new FormControl(null, Validators.pattern("^((\\+91-?)|0)?[0-9]{8}$")  ),
    fax: new FormControl(null),
    email: new FormControl(null,[Validators.email]),
    web: new FormControl(null                                                ),
    banque: new FormControl(null),
    rib: new FormControl(null),
  });
  get f() { return this.nouveauFournisseurForm.controls; }
  constructor(public dialogRef: MatDialogRef<NouveauFournisseurComponent>) {
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  confirm() {
    if (this.nouveauFournisseurForm.valid) {
      this.nouveauFournisseur = {
        adresse: this.nouveauFournisseurForm.value.adresse,
        banque: this.nouveauFournisseurForm.value.banque,
        code: this.nouveauFournisseurForm.value.code,
        designation: this.nouveauFournisseurForm.value.designation,
        email: this.nouveauFournisseurForm.value.email,
        fax: this.nouveauFournisseurForm.value.fax,
        rib: this.nouveauFournisseurForm.value.rib,
        tel: this.nouveauFournisseurForm.value.tel,
        web: this.nouveauFournisseurForm.value.web
      };
      this.dialogRef.close(this.nouveauFournisseur);
    }
  }


}
