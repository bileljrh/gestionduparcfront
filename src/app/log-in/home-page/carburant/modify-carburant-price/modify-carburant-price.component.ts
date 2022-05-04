import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AdministratifServiceService } from '../../administratif/administratif-service.service';
import { AgilisFileData } from '../import-excel-file/AgilisFileData';
import * as XLSX from 'xlsx';
import { Prices } from './Prices';
import { MatSort } from '@angular/material/sort';
import { PaginationConfiguration } from '../../pagination-configuration';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-modify-carburant-price',
  templateUrl: './modify-carburant-price.component.html',
  styleUrls: ['./modify-carburant-price.component.scss'],
  providers: [MatSnackBar]
})
export class ModifyCarburantPriceComponent implements OnInit {
  name = 'This is XLSX TO JSON CONVERTER';
  willDownload = false;
  mapped: Prices[] = [];
  private prices: Prices = {
    date: null,
    essence: 0,
    gazoil: 0,
    gazoilsanssoufre: 0
  }
  test2: any;
  showPriceFile: Prices[] = [];
  ListPrices: Prices[] = [];

  snackBarSuccesAddingMsg = 'L\'ajout d\'une visite technique a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'L\'ajout d\'une nouvelle visite technique ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
  // dataSource = new MatTableDataSource<Prices>(this.showPriceFile);
  displayedColumns2: string[] = ['index', 'date', 'essence', 'gazoil', 'gazoilsanssoufre'];
  displayedColumns: string[] = ['index', 'essence', 'gazoilsanssoufre', 'gazoil'];

  dataSource2 = new MatTableDataSource<Prices>(this.ListPrices);
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
  varEmp: Prices[] = [];
  dataSource = new MatTableDataSource<Prices>(this.varEmp);


  constructor(private adminService: AdministratifServiceService,
    private ngxLoader: NgxUiLoaderService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.ngxLoader.start();
    this.itemPerPage.patchValue(this.paginConfig.itemsPerPage);
    this.getTotalList();
    this.ngxLoader.stop();

  }
  ngOnInit(): void {
    this.subscriptions.push(this.itemPerPage.valueChanges.subscribe(value1 => {
      this.ngxLoader.start();
      this.paginConfig.currentPage = 0;
      this.paginConfig.itemsPerPage = value1;
      this.getTotalList();
      this.ngxLoader.stop();
    }));
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
  displayPageContent(paginConfig: PaginationConfiguration) {
    this.ngxLoader.start();
    this.subscriptions.push(this.adminService.getPaginationAgilisPrices((paginConfig.currentPage - 1).toString(), paginConfig.itemsPerPage.toString()).subscribe(value => {
      this.ListPrices = value;
      this.dataSource2 = new MatTableDataSource<Prices>(this.ListPrices);
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
    this.subscriptions.push(this.adminService.getTotalItemPricesList().subscribe(value => {
      this.paginConfig.totalItems = value;
    }));
    this.subscriptions.push(this.adminService.getPaginationAgilisPrices(this.paginConfig.currentPage.toString(), this.paginConfig.itemsPerPage.toString()).subscribe(value => {
      console.log(this.paginConfig.currentPage.toString());

      this.ListPrices = value;
      this.dataSource2 = new MatTableDataSource<Prices>(this.ListPrices);
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
        initial[name] = XLSX.utils.sheet_to_json(sheet, { defval: "" });
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      this.prices = {
        date: jsonData['Feuil1'].Date,
        essence: jsonData['Feuil1']['Essence Sans Plomb'],
        gazoil: jsonData['Feuil1'][2]
      }
      for (let i = 0; i < jsonData['Feuil1'].length; i++) {
        if (i != 0) {
          this.prices = {
            date: String(this.ExcelDateToJSDate(jsonData['Feuil1'][i].Date)),
            essence: jsonData['Feuil1'][i].__EMPTY_3,
            gazoilsanssoufre: jsonData['Feuil1'][i].__EMPTY_7,
            gazoil: jsonData['Feuil1'][i].__EMPTY_11
          };
          // this.adminService.updatePrices([this.prices]).subscribe();
          this.mapped.push(this.prices);
          this.varEmp.push(this.prices)
        }
      }
      this.dataSource = new MatTableDataSource<Prices>(this.varEmp);

      if (jsonData['Feuil1'].length == 0) {
        this.test = false
      } else {
        this.test = true
      }

      // document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
    }
    reader.readAsBinaryString(file);
  }


  somme(x, y) {
    return x + y;
  }

  ExcelDateToJSDate(serial) {
    var channelArray: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);
    var jr = String(date_info.getDate());
    var sum = this.somme(date_info.getMonth(), 1)
    var mois = String(sum)
    var fractional_day = serial - Math.floor(serial) + 0.0000001;
    var total_seconds = Math.floor(86400 * fractional_day);
    var seconds = total_seconds % 60;
    total_seconds -= seconds;
    /*     var hours = Math.floor(total_seconds / (60 * 60));
        var minutes = Math.floor(total_seconds / 60) % 60;
     */
    /*  if (date_info.getDate() < 10) {
       jr = '0' + date_info.getDate();
     }
     if ((date_info.getMonth() < 10) && (date_info.getMonth > 10)) {
       console.log("length");
       console.log(date_info.getMonth().toString.length);
 
 
       mois = '0' + (date_info.getMonth());
     } */
    return (date_info.getFullYear() + '-' + jr + '-' + ((mois)));
  }
  onSubmit() {
    this.ngxLoader.start();
    return this.adminService.updatePrices(this.mapped).subscribe(value => {
      this.varEmp = null;
      this.test = false;
      this.dataSource = new MatTableDataSource<Prices>(this.varEmp);

      this.ngxLoader.stop();

      console.log("subscribe");
      console.log(this.mapped);
    });
  }
  displayNotification(message: string) {
    setTimeout(() => {
      this.snackBar.open(message, 'X', { duration: 3000 });
    }, 800);
  }
}
