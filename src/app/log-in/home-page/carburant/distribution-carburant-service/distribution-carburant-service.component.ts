import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {DistributionServiceTabData} from '../distribution-service-tab-data';
import {CarburantServiceService} from '../carburant-service.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ModifyDistributionCarburantServiceComponent} from './modify-distribution-carburant-service/modify-distribution-carburant-service.component';
import {DeleteDistributionCarburantServiceComponent} from './delete-distribution-carburant-service/delete-distribution-carburant-service.component';
import { AuthenticationServiceService } from 'src/app/log-in/authentication-service.service';


@Component({
  selector: 'app-distribution-carburant-service',
  templateUrl: './distribution-carburant-service.component.html',
  styleUrls: ['./distribution-carburant-service.component.scss']
})
export class DistributionCarburantServiceComponent implements OnInit, AfterViewInit {
  distributionServiceTab: DistributionServiceTabData[] = [];
  displayedColumns: string[] = ['structure', 'beneficiaire', 'numero_plaque', 'quantiteAccordee', 'vehicule', 'supprimer', 'edit'];
  dataSource = new MatTableDataSource<DistributionServiceTabData>(this.distributionServiceTab);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private Authentication: AuthenticationServiceService, private Carburant: CarburantServiceService, private router: Router, public dialog: MatDialog) {
    this.Carburant.getListDistributionsCarburant2ServiceBySource('Service').subscribe(value => {
      this.distributionServiceTab = value;
      this.dataSource = new MatTableDataSource<DistributionServiceTabData>(this.distributionServiceTab);
    });
    this.setDisplayedColumns();

  }
  
ADD_DESTRIBUTION_CARBURANT_SERVICE: boolean;
MODIFY_DESTRIBUTION_CARBURANT_SERVICE: boolean;
DELETE_DESTRIBUTION_CARBURANT_SERVICE: boolean;
VIEW_DESTRIBUTION_CARBURANT_SERVICE: boolean;
VEHICULE_DESTRIBUTION_CARBURANT_SERVICE: boolean;

  ngOnInit(): void {
  }

  setDisplayedColumns() {
    this.ADD_DESTRIBUTION_CARBURANT_SERVICE = this.Authentication.authoritiesUtilisateur.ADD_DESTRIBUTION_CARBURANT_SERVICE;
    this.MODIFY_DESTRIBUTION_CARBURANT_SERVICE = this.Authentication.authoritiesUtilisateur.MODIFY_DESTRIBUTION_CARBURANT_SERVICE;
    this.DELETE_DESTRIBUTION_CARBURANT_SERVICE = this.Authentication.authoritiesUtilisateur.DELETE_DESTRIBUTION_CARBURANT_SERVICE;
    this.VEHICULE_DESTRIBUTION_CARBURANT_SERVICE = this.Authentication.authoritiesUtilisateur.VEHICULE_DESTRIBUTION_CARBURANT_SERVICE;
    this.VIEW_DESTRIBUTION_CARBURANT_SERVICE = this.Authentication.authoritiesUtilisateur.VIEW_DESTRIBUTION_CARBURANT_SERVICE;

  }  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createNewDistribution() {
    this.router.navigate(['/carburant/nouvelle_distribution_de_carburant_de_service']);
  }

  modifyRow(id: any, index: any) {
    let dialogRef = this.dialog.open(ModifyDistributionCarburantServiceComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {tabData: this.distributionServiceTab[index]}
    });
  }

  deleteRow(id: any) {
    let dialogRef = this.dialog.open(DeleteDistributionCarburantServiceComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {idEtatMensuel: id}
    });
  }

}

