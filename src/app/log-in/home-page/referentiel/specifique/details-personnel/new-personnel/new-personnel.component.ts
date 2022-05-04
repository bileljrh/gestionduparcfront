import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import moment from 'moment';
import {Personnel} from '../personnel';
import {Structure} from '../../structure-administrative/structure';
import {ReferentielSpecifiqueServiceService} from '../../referentiel-specifique-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-personnel',
  templateUrl: './new-personnel.component.html',
  styleUrls: ['./new-personnel.component.scss']
})
export class NewPersonnelComponent implements OnDestroy {
  test: any ;
  listAvantage: string[] = ['avantage1', 'Avantage2'];
  subscription: Subscription[] = [];
  selectedNewFile: File;
  formData: FormData;
  ListStructure: Structure[] = [];
  newPersonnel: Personnel = {
    cin: '',
    datePermis: '',
    fonction: '',
    grade: '',
    immatriculationUnique: '',
    nameImage: '',
    nom: '',
    pathImage: '',
    prenom: '',
    avantage:'',
    quota: '',
    structure: '',
    nombreVehicule: null
  };
  newPersonnelForm = new FormGroup({
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
  get f() { return this.newPersonnelForm.controls; }
  imageUploaded = false;
  url: any;
  codeStructure = '';
  

  constructor(public dialogRef: MatDialogRef<NewPersonnelComponent>, private Referentiel: ReferentielSpecifiqueServiceService) {
    this.subscription.push(this.Referentiel.getListStructure().subscribe(value => {
      this.ListStructure = value;
    }));
    this.subscription.push(this.newPersonnelForm.controls.structure.valueChanges.subscribe(value => {
      this.codeStructure = value.code;
    }));

    
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.newPersonnelForm.valid) {
      this.newPersonnel = {
        cin: this.newPersonnelForm.value.cin,
        datePermis: moment(this.newPersonnelForm.value.datePermis as Date).format('YYYY-MM-DD'),
        fonction: this.newPersonnelForm.value.fonction,
        grade: this.newPersonnelForm.value.grade,
        immatriculationUnique: this.newPersonnelForm.value.immatriculationUnique,
        nameImage: this.newPersonnelForm.value.nameImage,
        nom: this.newPersonnelForm.value.nom,
        pathImage: this.newPersonnelForm.value.pathImage,
        prenom: this.newPersonnelForm.value.prenom,
        avantage: this.newPersonnelForm.value.avantage,
        quota: this.newPersonnelForm.value.quota,
        structure: this.newPersonnelForm.value.structure,
        nombreVehicule: this.newPersonnelForm.value.nombreVehicule
      };
      this.dialogRef.close({newPersonnel: this.newPersonnel, imagePersonnel: this.formData});
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

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
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
