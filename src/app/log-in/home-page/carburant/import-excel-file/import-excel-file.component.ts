import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import * as XLSX from 'xlsx';
import { AdministratifServiceService } from '../../administratif/administratif-service.service';
import { PaginationConfiguration } from '../../pagination-configuration';
import { AgilisFileData } from './AgilisFileData';
import { CalculateConsommationComponent } from './calculate-consommation/calculate-consommation.component';
import { ModifyRowsFileComponent } from './modify-rows-file/modify-rows-file.component';
declare interface DateFilter {
  path: string;
  title: string;
}
export const ROUTES: DateFilter[] = [
  {
    path: "01-2022",
    title: "Janvier 2022",

  },
  {
    path: "02-2022",
    title: "Fevrier 2022",

  },
  {
    path: "03-2022",
    title: "Mars 2022",

  },
  {
    path: "04-2022",
    title: "Avril 2022",

  },
  {
    path: "05-2022",
    title: "Mai 2022",

  },
  {
    path: "06-2022",
    title: "Juin 2022",

  },
  {
    path: "07-2022",
    title: "Juillet 2022",

  },
  {
    path: "08-2022",
    title: "Aout 2022",

  },
  {
    path: "09-2022",
    title: "Septembre 2022",

  },
  {
    path: "10-2022",
    title: "Octobre 2022",

  },
  {
    path: "11-2022",
    title: "Novembre 2022",

  },
  {
    path: "12-2022",
    title: "Decembre 2022",

  }
];

@Component({
  selector: 'app-import-excel-file',
  templateUrl: './import-excel-file.component.html',
  styleUrls: ['./import-excel-file.component.scss'],
  providers: [MatSnackBar]
})
export class ImportExcelFileComponent implements OnInit {
  menuItems: any[];
  ListAgilisFileData: AgilisFileData[] = [];
  Status: string[] = ['01-2022', '02-2022', '03-2022', '04-2022', '05-2022', '06-2022', '07-2022', '08-2022', '09-2022', '10-2022', '11-2022', '12-2022'];
  //Status: string[] = ['en cours', 'Accord', 'finis'];
  statusForm = new FormControl(null);

  status = '';
  displayedColumns2: string[] = ['index', 'porteur', 'station', 'numcarte', 'consommation', 'modifier'];
  dataSource2 = new MatTableDataSource<AgilisFileData>(this.ListAgilisFileData);
  @ViewChild(MatSort) sort: MatSort;
  TypeCarburant: string[] = ['Essence', 'Mazout', 'Gasoil sans soufre'];


  itemPerPage = new FormControl(null);
  paginConfig: PaginationConfiguration = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 10
  };
  ItemPerPage: any[] = [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  customSearching = false;
  private subscriptions: Subscription[] = [];


  test: boolean;
  test2: any;
  willDownload = false;
  private fileExcel: any[] = [];
  dataExcel: AgilisFileData = {
    consommation: '',
    facturation: 0,
    idFile: '',
    crt_Porteur_Perso: '',
    montant: 0,
    produits: '',
    qte: 0,
    station: '',
    transac_date: '',
    transac_kilometrage: '',
    transac_num_carte: '',
    transac_num_carte_transfert: '',
    transac_num_ticket: '',
    transac_num_ticket_annulation: ''
  };
  snackBarSuccesAddingMsg = 'L\'ajout  a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'L\'ajout  ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';

  form = new FormGroup({
    transac_num_ticket_annulation: new FormControl(null, Validators.required),
    transac_num_ticket: new FormControl(null, Validators.required),
    transac_num_carte_transfert: new FormControl(null, Validators.required),
    transac_num_carte: new FormControl(null, Validators.required),
    transac_kilometrage: new FormControl(null, Validators.required),
    transac_date: new FormControl(null, Validators.required),
    station: new FormControl(null, Validators.required),
    qte: new FormControl(null, Validators.required),
    produits: new FormControl(null, Validators.required),
    montant: new FormControl(null, Validators.required),
    crt_Porteur_Perso: new FormControl(null, Validators.required),
    facturation: new FormControl(null, Validators.required),
    consommation: new FormControl(null, Validators.required)

  });
  varEmp: AgilisFileData[] = [];
  dataSource = new MatTableDataSource<AgilisFileData>(this.varEmp);
  constructor(private adminService: AdministratifServiceService,
    private ngxLoader: NgxUiLoaderService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,


  ) {
    this.ngxLoader.start();
    this.itemPerPage.patchValue(this.paginConfig.itemsPerPage);
    this.getTotalList();
    this.ngxLoader.stop();
    // this.setDisplayedColumns();
  }
  ngOnInit(): void {


    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.subscriptions.push(this.itemPerPage.valueChanges.subscribe(value1 => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value1;
      this.getTotalList();
      this.ngxLoader.stop();
    }));



    this.status = '';
    this.itemPerPage.valueChanges.subscribe(value => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value;
      this.getTotalList();
      this.ngxLoader.stop();
    });
    //console.log(this.ListDemandeIntervention.);
    this.statusForm.valueChanges.subscribe(value2 => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      console.log(value2);
      if (value2 === undefined) {
        this.status = '';
      } else {
        this.status = value2;
        console.log("le status!!");
        console.log(this.status);


      }

      this.getTotalList();
      this.ngxLoader.stop();
    });






  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.subscriptions.push(this.adminService.getPaginationDonneeExcelList((paginConfig.currentPage - 1).toString(), paginConfig.itemsPerPage.toString(), this.status).subscribe(value => {
      this.ListAgilisFileData = value;
      this.dataSource2 = new MatTableDataSource<AgilisFileData>(this.ListAgilisFileData);
      this.dataSource2.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      //  this.showNotification(this.snackBarFailureLoadingMsg);
    }));
  }
  handleCustomSearching() {
    this.customSearching = !this.customSearching;
  }

  showNotification(displayText: string) {
    setTimeout(() => {
      this.snackBar.open(displayText, 'X', { duration: 800 });
    });
  }

  getTotalList() {
    this.subscriptions.push(this.adminService.getTotalItemDataList().subscribe(value => {
      this.paginConfig.totalItems = value;
    }));
    this.subscriptions.push(this.adminService.getPaginationDonneeExcelList(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString(), this.status).subscribe(value => {
      console.log(this.paginConfig.currentPage.toString());

      this.ListAgilisFileData = value;
      this.dataSource2 = new MatTableDataSource<AgilisFileData>(this.ListAgilisFileData);
      this.dataSource2.sort = this.sort;
      this.ngxLoader.stop();
    }, error => {
      this.ngxLoader.stop();
      //  this.showNotification(this.snackBarFailureLoadingMsg);
    }));


  }
  numberToTable(inputNumber: number): number[] {
    const table: number[] = [];
    for (let i = 0; i < inputNumber; i++) {
      table.push(i);
    }
    return table;
  }

  onFileChange(ev) {

    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {

      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        const x = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      var jsonFile = (dataString);
      console.log(jsonData['Trans']);
      console.log(typeof jsonData['Trans']);
      jsonData['Trans'].consommation = "1920";
      let tosend = jsonData['Trans'].map(o => {
        o['transac_date'] = (this.ExcelDateToJSDate(o['transac_date']));
      })
      this.dataExcel = tosend;


      console.log(jsonData['Trans']);
      console.log(jsonData['Trans']);
      this.test2 = this.adminService.insertExcelData(jsonData['Trans']);
      this.varEmp = (jsonData.Trans);
      this.fileExcel = jsonData.Trans;
      this.dataSource = new MatTableDataSource<AgilisFileData>(this.varEmp);
      if (jsonData.Trans.length == 0) {
        this.test = false
      } else {
        this.test = true
      }

    }
    reader.readAsBinaryString(file);
  }
  displayedColumns: string[] = ['index', 'transac_date', 'transac_num_ticket', 'transac_num_ticket_annulation', 'station', 'montant', 'qte', 'consommation', 'typeCarte', 'typeTransaction'];
  modifyRow(i) {
    const dialogRef = this.dialog.open(CalculateConsommationComponent, {
      panelClass: 'mat-dialog-container-class',
      width: '500px',
      data: { element: this.ListAgilisFileData[i] }


    });

    dialogRef.afterClosed().subscribe(value3 => {
      console.log("value 3 ");
      console.log(value3);


      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.paginConfig.currentPage = 0;
        this.adminService.consommationCarburant(value3).subscribe(value1 => {
          this.getTotalList();
          this.ngxLoader.stop();
          //  this.showNotification(this.snackBarSuccesModifiyingMsg);
        }, error => {
          this.ngxLoader.stop();
          //  this.showNotification(this.snackBarFailureModifiyingMsg);
        });
      }
    });
  }




  onSubmit() {
    this.ngxLoader.start();
    return this.test2.subscribe(value => {
      this.ngxLoader.stop();
      console.log("subscribe");
      console.log(this.dataExcel);
      this.varEmp = null;
      this.test = false;
      this.dataSource = new MatTableDataSource<AgilisFileData>(this.varEmp);
    });
  }
  displayNotification(message: string) {
    setTimeout(() => {
      this.snackBar.open(message, 'X', { duration: 3000 });
    }, 800);
  }
  ExcelDateToJSDate(serial) {
    var channelArray: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);
    var jr = String(date_info.getDate());

    var mois = String(date_info.getMonth())
    var fractional_day = serial - Math.floor(serial) + 0.0000001;
    var total_seconds = Math.floor(86400 * fractional_day);
    var seconds = total_seconds % 60;
    total_seconds -= seconds;
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;
    console.log(date_info.getFullYear() + '-' + date_info.getMonth() + 1 + '-' + date_info.getDate());
    if (date_info.getDate() < 10) {
      jr = '0' + date_info.getDate();
      console.log('jr');
      console.log(jr);


    }

    if ((date_info.getMonth().toString.length == 0)) {
      console.log(date_info.getMonth().toString.length);
      mois = '0' + date_info.getMonth();

    }
    return (date_info.getFullYear() + '-' + (mois + 1) + '-' + jr);
  }


}
