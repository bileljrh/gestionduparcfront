import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { PaginationConfiguration } from '../../../pagination-configuration';
import { Fournisseur } from '../../../referentiel/general/fournisseurs/fournisseur';
import { ReferentielGeneraleServiceService } from '../../../referentiel/general/referentiel-generale-service.service';
import { BonTravailArticle } from '../../BonTravailArticle';
import { BonTravailArticleExterne } from '../../BonTravailArticleExterne';
import { BonTravailOperation } from '../../BonTravailOperation';
import { FacturationBonTravail } from '../../FacturationBonTravail';
import { MaintenanceAndReparationServiceService } from '../../maintenance-and-reparation-service.service';
import { BonTravail } from '../bon-travail';

@Component({
  selector: 'app-modify-bon-travail',
  templateUrl: './modify-bon-travail.component.html',
  styleUrls: ['./modify-bon-travail.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ModifyBonTravailComponent implements OnInit {
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 100
  };

  nouveauBonTravail:BonTravail={
    bonTravailArticle:[],
    bonTravailArticleExterne:[],
    bonTravailOperation:[],
    dateEntree:'',
    dateSortiePrevue:'',
    demandeMaintenance:null,
    facturation:[],
    indexKM:0,
    mode:'',
    natureTravaux:'',
    observation:'',
  };
  displayedColumns: string[] = ['index', 'codeArticle', 'designation', 'plus'];
  ListFournisseur: Fournisseur[] = [];
 // ListFacturation: FacturationBonTravail[] = [];
  ListFacturation: any = {};
  observationMode:'';
  articleTab: BonTravailArticle[] = [];
  operationTab:BonTravailOperation[]=[];
  externeTab:BonTravailArticleExterne[]=[];
  dataSource = new MatTableDataSource<BonTravailArticle>(this.articleTab);
  firstDataSource = new MatTableDataSource<BonTravailOperation>(this.operationTab);
  secondDataSource = new MatTableDataSource<BonTravailArticleExterne>(this.externeTab);


  expandedElement: BonTravailArticle[] | null;
  firstExpandedElement: BonTravailOperation[] | null;
  secondExpandedElement: BonTravailArticleExterne[] | null;

  modifyBonTravailForm = new FormGroup({
    fournisseur: new FormControl(null, Validators.required),
    dateCommande: new FormControl(null, Validators.required),
    numeroFacturation: new FormControl(null, Validators.required),
	  dateFacturation: new FormControl(null, Validators.required),
	  montantFacturation: new FormControl(null, Validators.required),
	  numeroReglement: new FormControl(null, Validators.required),
	  dateReglement: new FormControl(null, Validators.required),
	  montantReglement: new FormControl(null, Validators.required),
	  numeroCommande: new FormControl(null, Validators.required),
	  montantCommande: new FormControl(null, Validators.required),
    observatioMode:new FormControl(null ,Validators.required)
  });

  constructor(public dialogRef: MatDialogRef<ModifyBonTravailComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,
      private Referentiel: ReferentielGeneraleServiceService,
      private Maintenance : MaintenanceAndReparationServiceService) {
        console.log("observation mode !!!");
        
   console.log(data.element);
   
    if (data.element.mode=="EXTERNE"){
      if (data.element.facturation !=null) {
        
  
    this.Maintenance.getOnFacturation(data.element.facturation.id).subscribe((value:any)=>{
    this.ListFacturation=value;
    console.log("lite de facturation ::::");
    console.log(value);
  
    
  });
}
}
    if (data.element.mode=="EXTERNE"){
    this.modifyBonTravailForm.controls.dateCommande.patchValue(this.ListFacturation.dateCommande);
    this.modifyBonTravailForm.controls.numeroFacturation.patchValue(this.ListFacturation.numeroFacturation);
    this.modifyBonTravailForm.controls.dateFacturation.patchValue(this.ListFacturation.dateFacturation);
    this.modifyBonTravailForm.controls.montantFacturation.patchValue(this.ListFacturation.montantFacturation);
    this.modifyBonTravailForm.controls.numeroReglement.patchValue(this.ListFacturation.numeroReglement);
    this.modifyBonTravailForm.controls.dateReglement.patchValue(this.ListFacturation.dateReglement);  
    this.modifyBonTravailForm.controls.montantReglement.patchValue(this.ListFacturation.montantReglement);
    this.modifyBonTravailForm.controls.numeroCommande.patchValue(this.ListFacturation.numeroCommande);
    this.modifyBonTravailForm.controls.montantCommande.patchValue(this.ListFacturation.montantCommande);

    this.Referentiel.getListFournisseur(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListFournisseur = value;
      this.ListFournisseur.forEach(value1 => {
        if (this.ListFacturation!=null && this.ListFacturation.fournisseur!=null) {
          if (value1.id === this.ListFacturation.fournisseur.id) {
            this.modifyBonTravailForm.controls.fournisseur.patchValue(value1);
          }
          
        }
      
      });
    });
    
  }

  this.Referentiel.getAllBonArt(data.element.id).subscribe(value => {
    this.articleTab = value;
    this.dataSource = new MatTableDataSource<BonTravailArticle>(this.articleTab);
    console.log("articles");
    console.log(this.articleTab);
  });
    console.log("articles");
    console.log(this.articleTab);
    this.Referentiel.getAllOperations(data.element.id).subscribe(value => {
      this.operationTab = value;
      this.firstDataSource = new MatTableDataSource<BonTravailOperation>(this.operationTab);
      console.log("operations");
      console.log(this.operationTab);   
    });
    this.Referentiel.getAllArticleExterne(data.element.id).subscribe(value => {
      this.externeTab = value;
      console.log("articles externs");
      console.log(this.externeTab);
      this.secondDataSource= new MatTableDataSource<BonTravailArticleExterne>(this.externeTab);   
    });
  }
  checkBonTravailMode(){
    return (this.data.element.mode==("INTERNE"))
 }
  ngOnInit(): void {
    console.log("operations");
  }

  onCancel() {
    this.dialogRef.close();
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
