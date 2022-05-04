import {Component, Inject, OnDestroy} from '@angular/core';
import {Personnel} from '../personnel';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import moment from 'moment';
import {Structure} from '../../structure-administrative/structure';
import {ReferentielSpecifiqueServiceService} from '../../referentiel-specifique-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-modify-personnel',
  templateUrl: './modify-personnel.component.html',
  styleUrls: ['./modify-personnel.component.scss']
})
export class ModifyPersonnelComponent implements OnDestroy {
  test: any ;
  listAvantage: string[] = ['avantage1', 'Avantage2'];
  subscription: Subscription[] = [];
  selectedNewFile: File;
  modifiedPersonnel: Personnel = {
    id: null,
    cin: '',
    datePermis: '',
    fonction: '',
    grade: '',
    immatriculationUnique: '',
    nameImage: '',
    nom: '',
    pathImage: '',
    prenom: '',
    avantage: '' ,
    quota: '',
    structure: '',
    nombreVehicule: null
  };
  modifiedPersonnelForm = new FormGroup({
    avantageForm: new FormControl(null),
    cin: new FormControl(null, Validators.pattern("^((\\+91-?)|0)?[0-9]{8}$")),
    datePermis:  new FormControl(null, Validators.required),
    fonction: new FormControl(null),
    grade: new FormControl(null),
    immatriculationUnique: new FormControl(null, Validators.required),
    nameImage: new FormControl(null),
    nom: new FormControl(null, Validators.required),
    pathImage: new FormControl(null),
    prenom: new FormControl(null),
    quota: new FormControl(null),
    structure:  new FormControl(null, Validators.required),
    nombreVehicule: new FormControl(null),
  });
  imageUploaded = false;
  url: any;
  ListStructure: Structure[] = [];
  formData: FormData;
  codeStructure = '';

  constructor(public dialogRef: MatDialogRef<ModifyPersonnelComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private Referentiel: ReferentielSpecifiqueServiceService) {
    this.subscription.push(this.Referentiel.getListStructure().subscribe(value => {
      this.ListStructure = value;
      this.ListStructure.forEach(value1 => {
        if (value1.id === data.element.structure.id) {
          this.modifiedPersonnelForm.controls.structure.patchValue(value1);
        }
      });
    }));
    this.modifiedPersonnelForm.controls.cin.patchValue(data.element.cin);
    this.modifiedPersonnelForm.controls.datePermis.patchValue(data.element.datePermis);
    this.modifiedPersonnelForm.controls.fonction.patchValue(data.element.fonction);
    this.modifiedPersonnelForm.controls.grade.patchValue(data.element.grade);
    this.modifiedPersonnelForm.controls.immatriculationUnique.patchValue(data.element.immatriculationUnique);
    this.modifiedPersonnelForm.controls.nameImage.patchValue(data.element.nameImage);
    this.modifiedPersonnelForm.controls.nom.patchValue(data.element.nom);
    this.modifiedPersonnelForm.controls.pathImage.patchValue(data.element.pathImage);
    this.modifiedPersonnelForm.controls.prenom.patchValue(data.element.prenom);
    this.modifiedPersonnelForm.controls.quota.patchValue(data.element.quota);
    this.modifiedPersonnelForm.controls.nombreVehicule.patchValue(data.element.nombreVehicule);
    this.subscription.push(this.modifiedPersonnelForm.controls.structure.valueChanges.subscribe(value => {
      this.codeStructure = value.code;
    }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.modifiedPersonnelForm.valid) {
      this.modifiedPersonnel = {
        id: this.data.element.id,
        cin: this.modifiedPersonnelForm.value.cin,
        datePermis: moment(this.modifiedPersonnelForm.value.datePermis as Date).format('YYYY-MM-DD'),
        fonction: this.modifiedPersonnelForm.value.fonction,
        grade: this.modifiedPersonnelForm.value.grade,
        immatriculationUnique: this.modifiedPersonnelForm.value.immatriculationUnique,
        nameImage: this.modifiedPersonnelForm.value.nameImage,
        nom: this.modifiedPersonnelForm.value.nom,
        pathImage: this.modifiedPersonnelForm.value.pathImage,
        prenom: this.modifiedPersonnelForm.value.prenom,
        avantage: this.modifiedPersonnelForm.value.avantage,
        quota: this.modifiedPersonnelForm.value.quota,
        structure: this.modifiedPersonnelForm.value.structure,
        nombreVehicule: this.modifiedPersonnelForm.value.nombreVehicule
      };
      this.dialogRef.close({modifiedPersonnel: this.modifiedPersonnel, imagePersonnel: this.formData});
    }
  }

  onUploadNewDocument(event) {
    if (event.target.files && event.target.files[0]) {
      this.imageUploaded = true;
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => {
        this.url = event.target.result;
      };
    }
    this.selectedNewFile = (event.target.files[0] as File);
    if (this.selectedNewFile !== null) {
      this.formData = new FormData();
      this.formData.append('file', this.selectedNewFile, this.selectedNewFile.name);
    }
  }


  changeQuota(valuee){
   

    console.log(valuee)
    if(valuee=="Avantage2"){

     this.test=100 ;
     
    }
    else {
      this.test=200;
      
    }
 }

}
