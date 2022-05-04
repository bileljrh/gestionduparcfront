import {Component, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ReferentielSpecifiqueServiceService} from '../referentiel-specifique-service.service';
import {UGP} from './ugp';
import {NewUGPComponent} from './new-ugp/new-ugp.component';
import {ModifyUGPComponent} from './modify-ugp/modify-ugp.component';
import {DeleteUGPComponent} from './delete-ugp/delete-ugp.component';
import {NewMagasinComponent} from './new-magasin/new-magasin.component';
import {NewAtelierComponent} from './new-atelier/new-atelier.component';
import {NewRessourceComponent} from './new-ressource/new-ressource.component';
import {NewSectionComponent} from './new-section/new-section.component';
import {Magasin} from './magasin';
import {Atelier} from './atelier';
import {Ressource} from './ressource';
import {Section} from './section';
import {ModifyMagasinComponent} from './modify-magasin/modify-magasin.component';
import {ModifyAtelierComponent} from './modify-atelier/modify-atelier.component';
import {ModifyRessourceComponent} from './modify-ressource/modify-ressource.component';
import {ModifySectionComponent} from './modify-section/modify-section.component';
import {DeleteMagasinComponent} from './delete-magasin/delete-magasin.component';
import {DeleteAtelierComponent} from './delete-atelier/delete-atelier.component';
import {DeleteRessourceComponent} from './delete-ressource/delete-ressource.component';
import {DeleteSectionComponent} from './delete-section/delete-section.component';
import {Subscription} from 'rxjs';
import {AuthenticationServiceService} from '../../../../authentication-service.service';

@Component({
  selector: 'app-unite-gestion-parc',
  templateUrl: './unite-gestion-parc.component.html',
  styleUrls: ['./unite-gestion-parc.component.scss'],
  providers: [MatSnackBar]
})
export class UniteGestionParcComponent implements OnDestroy {
  VIEW_UNITE_GESTION_PARC: boolean;
  ADD_UNITE_GESTION_PARC: boolean;
  MODIFY_UNITE_GESTION_PARC: boolean;
  DELETE_UNITE_GESTION_PARC: boolean;

  subscription: Subscription[] = [];

  snackBarFailureLoadingMsg = 'Problème de chargement, actualiser la page s\'il vous plait';
  snackBarSuccesDeleteMsg = 'La structure sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteMsg = 'La structure sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesAddingMsg = 'La structure a été ajoutée avec succès';
  snackBarFailureAddingMsg = 'La structure ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMsg = 'La structure sélectionnée a été modifiée avec succès';
  snackBarFailureModifyingMsg = 'La structure sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  listUGP: UGP[] = [];


  snackBarSuccesAddingUgpMsg = 'La nouvelle unité a été ajoutée avec succès';
  snackBarFailureAddingUgpMsg = 'La nouvelle unité ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingUgpMsg = 'L\'unité sélectionnée a été modifiée avec succès';
  snackBarFailureModifyingUgpMsg = 'L\'unité sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesDeleteUgpMsg = 'L\'unité sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteUgpMsg = 'L\'unité sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';

  snackBarSuccesAddingAtelierMsg = 'Le nouveau atelier a été ajouté avec succès';
  snackBarFailureAddingAtelierMsg = 'Le nouveau atelier ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingAtelierMsg = 'L\'atelier sélectionné a été modifié avec succès';
  snackBarFailureModifyingAtelierMsg = 'L\'atelier sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  snackBarSuccesDeleteAtelierMsg = 'L\'atelier sélectionné a été supprimé avec succès';
  snackBarFailureDeleteAtelierMsg = 'L\'atelier sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';

  snackBarSuccesAddingMagasinMsg = 'Le magasin a été ajoutée avec succès';
  snackBarFailureAddingMagasinMsg = 'Le nouveau magasin ne pourra pas être ajouté, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingMagasinMsg = 'Le magasin sélectionné a été modifié avec succès';
  snackBarFailureModifyingMagasinMsg = 'Le magasin sélectionné ne pourra pas être modifié, réessayez de nouveau s\'il vous plait';
  snackBarSuccesDeleteMagasinMsg = 'Le magasin sélectionné a été supprimé avec succès';
  snackBarFailureDeleteMagasinMsg = 'Le magasin sélectionné ne pourra pas être supprimé, réessayez de nouveau s\'il vous plait';

  snackBarSuccesAddingRessourceMsg = 'La nouvelle ressource a été ajoutée avec succès';
  snackBarFailureAddingRessourceMsg = 'La nouvelle ressource ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingRessourceMsg = 'La ressource sélectionnée a été modifiée avec succès';
  snackBarFailureModifyingRessourceMsg = 'La ressource sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesDeleteRessourceMsg = 'La ressource sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteRessourceMsg = 'La ressource sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';

  snackBarSuccesAddingSectionMsg = 'La nouvelle section a été ajoutée avec succès';
  snackBarFailureAddingSectionMsg = 'La nouvelle section ne pourra pas être ajoutée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesModifyingSectionMsg = 'La section sélectionnée a été modifiée avec succès';
  snackBarFailureModifyingSectionMsg = 'La section sélectionnée ne pourra pas être modifiée, réessayez de nouveau s\'il vous plait';
  snackBarSuccesDeleteSectionMsg = 'La section sélectionnée a été supprimée avec succès';
  snackBarFailureDeleteSectionMsg = 'La section sélectionnée ne pourra pas être supprimée, réessayez de nouveau s\'il vous plait';


  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private ngxLoader: NgxUiLoaderService, private Referentiel: ReferentielSpecifiqueServiceService, private Authentication: AuthenticationServiceService) {
    this.ngxLoader.start();
    this.VIEW_UNITE_GESTION_PARC = this.Authentication.authoritiesUtilisateur.VIEW_UNITE_GESTION_PARC;
    this.ADD_UNITE_GESTION_PARC = this.Authentication.authoritiesUtilisateur.ADD_UNITE_GESTION_PARC;
    this.DELETE_UNITE_GESTION_PARC = this.Authentication.authoritiesUtilisateur.DELETE_UNITE_GESTION_PARC;
    this.MODIFY_UNITE_GESTION_PARC = this.Authentication.authoritiesUtilisateur.MODIFY_UNITE_GESTION_PARC;
    this.getListUGP();
    this.ngxLoader.stop();
  }


  modifyUGP(el: UGP) {
    if (this.MODIFY_UNITE_GESTION_PARC) {
      const dialogRef = this.dialog.open(ModifyUGPComponent, {
        width: '900px',
        panelClass: 'mat-dialog-container-class',
        data: {element: el}
      });
      this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
        if (value3 !== undefined) {
          this.ngxLoader.start();
          this.subscription.push(this.Referentiel.modifySelectedUGP(value3).subscribe(value => {
            this.getListUGP();
            this.ngxLoader.stop();
            this.showNotification(this.snackBarSuccesModifyingUgpMsg);
          }, error => {
            this.ngxLoader.stop();
            this.showNotification(this.snackBarFailureModifyingUgpMsg);
          }));
        }
      }));
    }
  }

  deleteSelectedUGP(i: number) {
    const dialogRef = this.dialog.open(DeleteUGPComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.deleteSelectedUGP(value3).subscribe(value => {
          this.getListUGP();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesDeleteUgpMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureDeleteUgpMsg);
        }));
      }
    }));
  }

  getListUGP() {
    this.subscription.push(this.Referentiel.getListUGP().subscribe(value => {
      this.listUGP = value;
    }, error => {
      this.showNotification(this.snackBarFailureLoadingMsg);
    }));
  }

  showNotification(displayText: string) {
    setTimeout(() => {
      this.snackBar.open(displayText, 'X', {duration: 800});
    });
  }

  ajouterUGP() {
    const dialogRef = this.dialog.open(NewUGPComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {structureMere: true}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.addNewUGP(value3).subscribe(value => {
          this.getListUGP();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesAddingUgpMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureAddingUgpMsg);
        }));
      }
    }));
  }

  addNewMagasin(parent: UGP) {
    const dialogRef = this.dialog.open(NewMagasinComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: parent}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.addNewMagasin(value3, value3.ugp.id).subscribe(value => {
          this.getListUGP();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesAddingMagasinMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureAddingMagasinMsg);
        }));
      }
    }));
  }

  addNewAtelier(parent: UGP) {
    const dialogRef = this.dialog.open(NewAtelierComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {element: parent}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.addNewAtelier(value3, value3.ugp.id).subscribe(value => {
          this.getListUGP();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesAddingAtelierMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureAddingAtelierMsg);
        }));
      }
    }));
  }

  addNewRessource(parent: UGP) {
    const dialogRef = this.dialog.open(NewRessourceComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {ugp: parent}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.addNewRessource(value3, value3.ugp.id).subscribe(value => {
          this.getListUGP();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesAddingRessourceMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureAddingRessourceMsg);
        }));
      }
    }));
  }

  addNewSection(isM: boolean, isA: boolean, isR: boolean, m: Magasin, a: Atelier, r: Ressource) {
    const dialogRef = this.dialog.open(NewSectionComponent, {
      width: '900px',
      panelClass: 'mat-dialog-container-class',
      data: {magasin: m, atelier: a, ressource: r, isMagasin: isM, isAtelier: isA, isRessource: isR}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        if (isM) {
          this.subscription.push(this.Referentiel.addNewSection(value3, 'Magasin', m.id).subscribe(value => {
            this.getListUGP();
            this.ngxLoader.stop();
            this.showNotification(this.snackBarSuccesAddingSectionMsg);
          }, error => {
            this.ngxLoader.stop();
            this.showNotification(this.snackBarFailureAddingSectionMsg);
          }));
        }
        if (isA) {
          this.subscription.push(this.Referentiel.addNewSection(value3, 'Atelier', a.id).subscribe(value => {
            this.getListUGP();
            this.ngxLoader.stop();
            this.showNotification(this.snackBarSuccesAddingSectionMsg);
          }, error => {
            this.ngxLoader.stop();
            this.showNotification(this.snackBarFailureAddingSectionMsg);
          }));
        }
        if (isR) {
          this.subscription.push(this.Referentiel.addNewSection(value3, 'Ressource', r.id).subscribe(value => {
            this.getListUGP();
            this.ngxLoader.stop();
            this.showNotification(this.snackBarSuccesAddingSectionMsg);
          }, error => {
            this.ngxLoader.stop();
            this.showNotification(this.snackBarFailureAddingSectionMsg);
          }));
        }
        this.ngxLoader.stop();
      }
    }));
  }

  modifyMagasin(m: Magasin, u: UGP) {
    if (this.MODIFY_UNITE_GESTION_PARC) {
      const dialogRef = this.dialog.open(ModifyMagasinComponent, {
        width: '900px',
        panelClass: 'mat-dialog-container-class',
        data: {magasin: m, UGP: u}
      });
      this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
        if (value3 !== undefined) {
          this.ngxLoader.start();
          this.subscription.push(this.Referentiel.modifySelectedMagasin(value3).subscribe(value => {
            this.getListUGP();
            this.ngxLoader.stop();
            this.showNotification(this.snackBarSuccesModifyingMagasinMsg);
          }, error => {
            this.ngxLoader.stop();
            this.showNotification(this.snackBarFailureModifyingMagasinMsg);
          }));
        }
      }));
    }
  }

  modifyAtelier(a: Atelier, u: UGP) {
    if (this.MODIFY_UNITE_GESTION_PARC) {
      const dialogRef = this.dialog.open(ModifyAtelierComponent, {
        width: '900px',
        panelClass: 'mat-dialog-container-class',
        data: {atelier: a, ugp: u}
      });
      this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
        if (value3 !== undefined) {
          this.ngxLoader.start();
          this.subscription.push(this.Referentiel.modifySelectedAtelier(value3).subscribe(value => {
            this.getListUGP();
            this.ngxLoader.stop();
            this.showNotification(this.snackBarSuccesModifyingAtelierMsg);
          }, error => {
            this.ngxLoader.stop();
            this.showNotification(this.snackBarFailureModifyingAtelierMsg);
          }));
        }
      }));
    }

  }

  modifyRessource(r: Ressource, u: UGP) {
    if (this.MODIFY_UNITE_GESTION_PARC) {
      const dialogRef = this.dialog.open(ModifyRessourceComponent, {
        width: '900px',
        panelClass: 'mat-dialog-container-class',
        data: {ressource: r, ugp: u}
      });
      this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
        if (value3 !== undefined) {
          this.ngxLoader.start();
          this.subscription.push(this.Referentiel.modifySelectedRessource(value3).subscribe(value => {
            this.getListUGP();
            this.ngxLoader.stop();
            this.showNotification(this.snackBarSuccesModifyingRessourceMsg);
          }, error => {
            this.ngxLoader.stop();
            this.showNotification(this.snackBarFailureModifyingRessourceMsg);
          }));
        }
      }));
    }

  }

  modifySection(isM: boolean, isA: boolean, isR: boolean, m: Magasin, a: Atelier, r: Ressource, s: Section) {
    if (this.MODIFY_UNITE_GESTION_PARC) {
      const dialogRef = this.dialog.open(ModifySectionComponent, {
        width: '900px',
        panelClass: 'mat-dialog-container-class',
        data: {magasin: m, atelier: a, ressource: r, isMagasin: isM, isAtelier: isA, isRessource: isR, section: s}
      });
      this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
        if (value3 !== undefined) {
          this.ngxLoader.start();
          this.subscription.push(this.Referentiel.modifySelectedSection(value3).subscribe(value => {
            this.getListUGP();
            this.ngxLoader.stop();
            this.showNotification(this.snackBarSuccesModifyingSectionMsg);
          }, error => {
            this.ngxLoader.stop();
            this.showNotification(this.snackBarFailureModifyingSectionMsg);
          }));
        }
      }));
    }
  }

  deleteMagasin(i: number) {
    const dialogRef = this.dialog.open(DeleteMagasinComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.deleteSelectedMagasin(value3).subscribe(value => {
          this.getListUGP();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesDeleteMagasinMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureDeleteMagasinMsg);
        }));
      }
    }));
  }

  deleteAtelier(i: number) {
    const dialogRef = this.dialog.open(DeleteAtelierComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.deleteSelectedAtelier(value3).subscribe(value => {
          this.getListUGP();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesDeleteAtelierMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureDeleteAtelierMsg);
        }));
      }
    }));
  }

  deleteRessource(i: number) {
    const dialogRef = this.dialog.open(DeleteRessourceComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.deleteSelectedRessource(value3).subscribe(value => {
          this.getListUGP();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesDeleteRessourceMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureDeleteRessourceMsg);
        }));
      }
    }));
  }

  deleteSection(i: number) {
    const dialogRef = this.dialog.open(DeleteSectionComponent, {
      width: '540px',
      panelClass: 'mat-dialog-container-class',
      data: {id: i}
    });
    this.subscription.push(dialogRef.afterClosed().subscribe(value3 => {
      if (value3 !== undefined) {
        this.ngxLoader.start();
        this.subscription.push(this.Referentiel.deleteSelectedSection(value3).subscribe(value => {
          this.getListUGP();
          this.ngxLoader.stop();
          this.showNotification(this.snackBarSuccesDeleteSectionMsg);
        }, error => {
          this.ngxLoader.stop();
          this.showNotification(this.snackBarFailureDeleteSectionMsg);
        }));
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(value => {
      value.unsubscribe();
    });
  }


}
