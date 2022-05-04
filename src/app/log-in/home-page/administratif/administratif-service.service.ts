import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicule } from './vehicules/vehicule';
import { AssuranceTableData } from './assurances/assurance-table-data';
import { Document } from './vehicules/document';
import { environment } from '../../../../environments/environment.prod';
import { NewVehicule } from './vehicules/new-vehicule';
import { Beneficiaire } from './vehicules/beneficiaire';
import { VehiculeTableData } from './vehicules/vehicule-table-data';
import { OneVehicule } from './vehicules/one-vehicule';
import { TaxeCirculation } from './taxe-de-circulation/taxe-circulation';
import { SelectVehicule } from './vehicules/select-vehicule';
import { TaxeCirculationTableData } from './taxe-de-circulation/taxe-circulation-table-data';
import { VisiteTechniqueTableData } from './visite-technique/visite-technique-table-data';
import { VisiteTechnique } from './visite-technique/visite-technique';
import { ReformeTableData } from './reforme-et-sortie-de-compte/reforme-table-data';
import { GpsTableData } from './gps/gps-table-data';
import { NewAssurance } from './assurances/new-assurance';
import { DocumentTableData } from './vehicules/document-table-data';
import { AgilisFileData } from '../carburant/import-excel-file/AgilisFileData';
import { Prices } from '../carburant/modify-carburant-price/Prices';

@Injectable({
  providedIn: 'root'
})
export class AdministratifServiceService {
  serverURL = environment.serverUrl;
  public documents2BeDeleted: Document[] = [];
  public documents2BeUploaded: FormData[] = [];
  public idDocument2BeDeleted: number[] = [];
  documentsName: string[] = [];

  constructor(private http: HttpClient) {
  }

  addNewVehicule(newVehicule: NewVehicule): Observable<number> {
    return this.http.post<number>(this.serverURL + '/vehicule', newVehicule);
  }

  modifySelectedVehicule(newVehicule: NewVehicule): Observable<number> {
    return this.http.put<number>(this.serverURL + '/vehicule', newVehicule);
  }

  getOneVehicule(id: number): Observable<Vehicule> {
    return this.http.get<Vehicule>(this.serverURL + '/vehicule/' + id);
  }

  getAssuranceCustomSearching(obj: any): Observable<AssuranceTableData[]> {
    return this.http.put<AssuranceTableData[]>(this.serverURL + '/assurances', obj);
  }

  addDocument2Bedeleted(document: Document) {
    this.documents2BeDeleted.push(document);
  }

  deleteDocument2BeUploaded(index: number) {
    this.documents2BeUploaded.splice(index, 1);
    this.documentsName.splice(index, 1);
  }

  addDocument2BeUploaded(file: File) {
    if (file !== null) {
      const formData = new FormData();
      formData.append('file', file, file.name);
      this.documents2BeUploaded.push(formData);
      this.documentsName.push(file.name);
    }
  }

  addIdsDocument2BeDeleted(i: number) {
    this.idDocument2BeDeleted.push(i);
  }

  modifyOneVehicule(vehicule: any, id: number): Observable<any> {
    return this.http.put(this.serverURL + '/vehicule/' + id, vehicule);
  }

  deleteOneDocument(document: Document, id: number): Observable<any> {
    return this.http.delete(this.serverURL + '/vehicule/document/' + id, {
      params: {
        documentName: document.documentName,
        documentAdress: document.documentAdress
      }
    });
  }

  uploadOneDocument(fd: FormData, id: number): Observable<any> {
    return this.http.post(this.serverURL + '/vehicule/upload/' + id, fd);
  }

  uploadNewVehiculeFile(fd: FormData): Observable<Document> {
    return this.http.post<Document>(this.serverURL + '/newVehicule/file/', fd);
  }

  deleteSelectedVignette(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/taxe_de_circulation/' + id);
  }

  getAllVehiculesNumeroPlaque(): Observable<string[]> {
    return this.http.get<string[]>(this.serverURL + '/numero_plaque');
  }

  createNewVisiteTechnique(obj: any): Observable<any> {
    return this.http.post<any>(this.serverURL + '/newVisiteTechnique', obj);
  }

  createNewReforme(obj: any): Observable<any> {
    return this.http.post<any>(this.serverURL + '/reformes', obj);
  }

  modifyOneReforme(obj: any): Observable<any> {
    return this.http.put<any>(this.serverURL + '/reformes', obj);
  }

  deleteOneReforme(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/reformes/' + id);
  }

  modifyOneTaxeCirculation(obj: any): Observable<any> {
    return this.http.post<any>(this.serverURL + '/modify_taxe_de_circulation', obj);
  }

  deleteSelectedVehicule(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/vehicule/' + id);
  }

  // new ==========================================================================

  getListBeneficiaires(): Observable<Beneficiaire[]> {
    return this.http.get<Beneficiaire[]>(this.serverURL + '/beneficiaire');
  }

  getSelectVehiculeByStrucutureForTaxeCirculation(): Observable<SelectVehicule[]> {
    return this.http.get<SelectVehicule[]>(this.serverURL + '/select_vehicule_taxe_circulation');
  }

  getPaginationVehiculeTableDataList(page: string, limit: string): Observable<VehiculeTableData[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<VehiculeTableData[]>(this.serverURL + '/pagination_vehicule', { params });
  }

  getTotalItemVehiculeTableDataList(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_item_vehicule');
  }

  getSelectedVehicule(id: number): Observable<OneVehicule> {
    return this.http.get<OneVehicule>(this.serverURL + '/vehicule/' + id);
  }

  addNewTaxeCirculation(taxeCirculation: TaxeCirculation, id: number): Observable<any> {
    return this.http.post<any>(this.serverURL + '/taxe_circulation/' + id, taxeCirculation);
  }

  modifySelectedTaxeCirculation(taxeCirculation: TaxeCirculationTableData): Observable<any> {
    return this.http.put<any>(this.serverURL + '/taxe_circulation', taxeCirculation);
  }

  deleteSelectedTaxeCirculation(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/taxe_circulation/' + id);
  }

  getPaginationTaxeCirculationList(page: string, limit: string): Observable<TaxeCirculationTableData[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<TaxeCirculationTableData[]>(this.serverURL + '/pagination_taxe_circulation', { params });
  }

  getTotalItemTaxeCirculationList(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_item_taxe_circulation');
  }

  //    Assurance=======================================================

  addNewAssurance(assurance: NewAssurance): Observable<any> {
    return this.http.post<any>(this.serverURL + '/assurance', assurance);
  }

  getSelectVehiculeByStrucutureForAssurance(): Observable<SelectVehicule[]> {
    return this.http.get<SelectVehicule[]>(this.serverURL + '/select_vehicule_assurance');
  }

  getPaginationAssuranceList(page: string, limit: string): Observable<AssuranceTableData[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<AssuranceTableData[]>(this.serverURL + '/pagination_assurance', { params });
  }

  getPaginationDonneeExcelList(page: string, limit: string, idFile: string): Observable<any[]> {
    const params = new HttpParams().set('page', page).set('limit', limit).set('idFile', idFile);
    return this.http.get<any[]>(this.serverURL + '/pagination_agilis_data', { params });
  }
  getTotalItemAssuranceList(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_item_assurance');
  }

  modifySelectedAssurance(assurance: NewAssurance): Observable<any> {
    return this.http.put<number>(this.serverURL + '/assurance', assurance);
  }

  deleteSelectedAssurance(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/assurance/' + id);
  }

  //    Visite technique =======================================================

  addNewVisiteTechnique(visiteTechnique: VisiteTechniqueTableData): Observable<any> {
    return this.http.post<number>(this.serverURL + '/visite_technique', visiteTechnique);
  }

  getSelectVehiculeByStrucutureForVisiteTechnique(): Observable<SelectVehicule[]> {
    return this.http.get<SelectVehicule[]>(this.serverURL + '/select_vehicule_visite_technique');
  }

  listStructure(): Observable<any> {
    return this.http.get<any>(this.serverURL + '/liste_structre')
  }
  getPaginationVisiteTechniqueList(structure: string, page: string, limit: string): Observable<VisiteTechniqueTableData[]> {
    const params = new HttpParams().set('structure', structure).set('page', page).set('limit', limit);
    return this.http.get<VisiteTechniqueTableData[]>(this.serverURL + '/pagination_visite_technique', { params });
  }

  getTotalItemVisiteTechniqueList(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_item_visite_technique');
  }

  modifySelectedVisiteTechnique(visiteTechnique: VisiteTechnique): Observable<any> {
    return this.http.put<number>(this.serverURL + '/visite_technique', visiteTechnique);
  }

  deleteSelectedVisiteTechnique(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/visite_technique/' + id);
  }

  //    Réforme =======================================================

  addNewReforme(reforme: ReformeTableData): Observable<any> {
    return this.http.post<number>(this.serverURL + '/reforme', reforme);
  }

  modifySelectedReforme(reforme: ReformeTableData): Observable<any> {
    return this.http.put<number>(this.serverURL + '/reforme', reforme);
  }

  getSelectVehiculeByStrucutureForReforme(): Observable<SelectVehicule[]> {
    return this.http.get<SelectVehicule[]>(this.serverURL + '/select_vehicule_reforme');
  }

  getPaginationReformeList(page: string, limit: string): Observable<ReformeTableData[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<ReformeTableData[]>(this.serverURL + '/pagination_reforme', { params });
  }

  getTotalItemReformeList(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_item_reforme');
  }

  deleteSelectedReforme(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/reforme/' + id);
  }

  //    GPS =======================================================

  addNewGPS(gps: GpsTableData, id: number): Observable<any> {
    return this.http.post<number>(this.serverURL + '/gps/' + id, gps);
  }

  modifySelectedGPS(gps: GpsTableData): Observable<any> {
    return this.http.put<number>(this.serverURL + '/gps', gps);
  }

  deleteSelectedGPS(id: number): Observable<any> {
    return this.http.delete<number>(this.serverURL + '/gps/' + id);
  }

  getPaginationGPSList(page: string, limit: string): Observable<GpsTableData[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<GpsTableData[]>(this.serverURL + '/pagination_gps', { params });
  }

  getTotalItemGPSList(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_item_gps');
  }

  getSelectVehiculeByStrucutureForGPS(): Observable<SelectVehicule[]> {
    return this.http.get<SelectVehicule[]>(this.serverURL + '/select_vehicule_gps');
  }

  // images ==========================================

  uploadImageCar(id: number, fd: FormData): Observable<any> {
    return this.http.post<any>(this.serverURL + '/upload_image_car/' + id, fd);
  }

  getByteImageCar(id: number, imageName: string): Observable<any> {
    return this.http.get<any>(this.serverURL + '/image_car/' + imageName);
  }

  uploadDocumentCar(id: number, fd: FormData): Observable<any> {
    return this.http.post<any>(this.serverURL + '/upload_document_car/' + id, fd);
  }

  getByteDocumentCar(id: number, imageName: string): Observable<any> {
    return this.http.get<any>(this.serverURL + '/document_car/' + imageName);
  }

  // documents ==========================================

  getListDocumentByVehicule(idVehicule: number): Observable<DocumentTableData[]> {
    return this.http.get<DocumentTableData[]>(this.serverURL + '/document_vehicule/' + idVehicule);
  }

  deleteSelectedDocument(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + '/document_vehicule/' + id);
  }


  insertExcelData(agilisFileData: AgilisFileData): Observable<any> {
    return this.http.post<any>(this.serverURL + '/postFileContent', agilisFileData);
  }


  updatePrices(prices: any): Observable<any> {
    return this.http.put<any>(this.serverURL + '/postFileContent', prices);
  }

  getTotalItemDataList(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_item_bon_commande');
  }


  consommationCarburant(consommation: AgilisFileData): Observable<number> {
    return this.http.put<number>(this.serverURL + '/consommation', consommation);
  }


  getPaginationAgilisPrices(page: string, limit: string): Observable<Prices[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<Prices[]>(this.serverURL + '/pagination_agilis_prices', { params });
  }



  getTotalItemPricesList(): Observable<number> {
    return this.http.get<number>(this.serverURL + '/total_item_Prices');
  }

}
