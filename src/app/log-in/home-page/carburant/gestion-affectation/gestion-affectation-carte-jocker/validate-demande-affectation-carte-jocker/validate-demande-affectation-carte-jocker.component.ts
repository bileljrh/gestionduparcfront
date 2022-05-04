import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-validate-demande-affectation-carte-jocker',
    templateUrl: './validate-demande-affectation-carte-jocker.component.html',
    styleUrls: ['./validate-demande-affectation-carte-jocker.component.scss']
})
export class ValidateDemandeAffectationCarteJockerComponent {


    constructor(public dialogRef: MatDialogRef<ValidateDemandeAffectationCarteJockerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }


    closeDialog(): void {
        this.dialogRef.close();
    }

    onCancelDelete() {
        this.dialogRef.close();
    }

    onConfirmDelete() {
        this.dialogRef.close(this.data.id);
    }

}
