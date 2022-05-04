import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LogInComponent} from './log-in/log-in.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {HomePageModule} from './log-in/home-page/home-page.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxUiLoaderConfig, NgxUiLoaderModule} from 'ngx-ui-loader';
import {NgxPaginationModule} from 'ngx-pagination';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule} from '@angular-material-components/datetime-picker';
import {NgxMatMomentModule} from '@angular-material-components/moment-adapter';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatTreeModule} from '@angular/material/tree';
import {DeleteAlerteComponent} from './log-in/home-page/administration/alertes/delete-alerte/delete-alerte.component';
import {ModifyAlerteComponent} from './log-in/home-page/administration/alertes/modify-alerte/modify-alerte.component';
import {NewAlerteComponent} from './log-in/home-page/administration/alertes/new-alerte/new-alerte.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthenticationInterceptor} from './log-in/Interceptor/authentication.interceptor';
import {SearchTaxeCirculationComponent} from './log-in/home-page/administratif/taxe-de-circulation/search-taxe-circulation/search-taxe-circulation.component';
import {ModifyTaxeCirculationComponent} from './log-in/home-page/administratif/taxe-de-circulation/modify-taxe-circulation/modify-taxe-circulation.component';
import {DeleteTaxeCirculationComponent} from './log-in/home-page/administratif/taxe-de-circulation/delete-taxe-circulation/delete-taxe-circulation.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {NewRechargeCarteAgilisCashComponent} from './log-in/home-page/carburant/gestion-affectation/gestion-recharge-carte-agilis-cash/new-recharge-carte-agilis-cash/new-recharge-carte-agilis-cash.component';
import {MatDividerModule} from '@angular/material/divider';
import { CreateDemandeQuotaCarteJockerComponent } from './log-in/home-page/carburant/carte-jocker/gestion-demande-quota-carte-jocker/create-demande-quota-carte-jocker/create-demande-quota-carte-jocker.component';
import { UpdateDemandeQuotaCarteJockerComponent } from './log-in/home-page/carburant/carte-jocker/gestion-demande-quota-carte-jocker/update-demande-quota-carte-jocker/update-demande-quota-carte-jocker.component';
import { DeleteDemandeQuotaCarteJockerComponent } from './log-in/home-page/carburant/carte-jocker/gestion-demande-quota-carte-jocker/delete-demande-quota-carte-jocker/delete-demande-quota-carte-jocker.component';
import { NotificationElementComponent } from './log-in/home-page/notification-element/notification-element.component';


const ngxUiLoaderConfiguration: NgxUiLoaderConfig = {
  bgsColor: '#e78e8e',
  bgsOpacity: 0.2,
  bgsPosition: 'bottom-right',
  bgsSize: 140,
  bgsType: 'fading-circle',
  blur: 1,
  delay: 0,
  fastFadeOut: true,
  fgsColor: '#3f51b5',
  fgsPosition: 'center-center',
  fgsSize: 50,
  fgsType: 'ball-spin-clockwise-fade-rotating',
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 120,
  logoUrl: '',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(228,215,215,0)',
  pbColor: '#ffffff',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: false,
  text: '',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300
};

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    DeleteAlerteComponent,
    ModifyAlerteComponent,
    NewAlerteComponent,
    SearchTaxeCirculationComponent,
    ModifyTaxeCirculationComponent,
    DeleteTaxeCirculationComponent,
    NewRechargeCarteAgilisCashComponent,
    DeleteDemandeQuotaCarteJockerComponent,
    CreateDemandeQuotaCarteJockerComponent,
    UpdateDemandeQuotaCarteJockerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    HomePageModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    FormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfiguration),
    NgxPaginationModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMatMomentModule,
    NgxMatSelectSearchModule,
    CdkTreeModule,
    MatTreeModule,
    MatRadioModule,
    MatSelectModule,
    PdfViewerModule,
    MatDividerModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}],
  exports: [NgxMatMomentModule, NgxMatSelectSearchModule],
  bootstrap: [AppComponent]
})


export class AppModule {
}
