import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Role} from '../role';

@Component({
  selector: 'app-modify-groupe-utilisateur',
  templateUrl: './modify-groupe-utilisateur.component.html',
  styleUrls: ['./modify-groupe-utilisateur.component.scss']
})
export class ModifyGroupeUtilisateurComponent {
  modifyGroupeUtilisateur: Role = {id: null, designation: '', profil: ''};
  modifyGroupeUtilisateurForm = new FormGroup({
    profil: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required)
  });

  constructor(public dialogRef: MatDialogRef<ModifyGroupeUtilisateurComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modifyGroupeUtilisateurForm.controls.profil.patchValue(data.element.profil);
    this.modifyGroupeUtilisateurForm.controls.designation.patchValue(data.element.designation);
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifyGroupeUtilisateurForm.valid) {
      this.modifyGroupeUtilisateur = {
        id: this.data.element.id,
        designation: this.modifyGroupeUtilisateurForm.value.designation,
        profil: this.modifyGroupeUtilisateurForm.value.profil
      };
      this.dialogRef.close(this.modifyGroupeUtilisateur);
    }
  }

}
