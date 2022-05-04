import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Utilisateur} from './home-page/administration/creation-utilisateurs/utilisateur';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationServiceService} from './authentication-service.service';
import {HttpResponse} from '@angular/common/http';
import {HeaderType} from './enum/header-type.enum';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CustomUser} from './home-page/custom-user';
import {AdministrationServiceService} from './home-page/administration/administration-service.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  providers: [MatSnackBar]
})
export class LogInComponent implements OnInit {
  loginUtilisateur: Utilisateur = {matricule: '', mot2passe: ''};
  loginUtilisateurForm = new FormGroup({
    matricule: new FormControl(null, Validators.required),
    mot2passe: new FormControl(null, Validators.required),
  });
  resetPasswordUtilisateurForm = new FormGroup({
    matricule: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
  });
  logIn: boolean;
  hide = true;
  windowheight: number;
  windowidth: number;
  snackBarFailureLogIn = 'Echec de connexion : numéro de matricule ou mot de passe incorrect';
  snackBarSuccessResetPassword = 'Votre demande a été prise en compte et sera traitée dès que possible';
  snackBarFailureResetPassword = 'Votre demande ne pourra pas être envoyée, réessayez de nouveau s\'il vous plait';
  souvenirControl = new FormControl(null);
  seSouvenir: boolean;

  constructor(private router: Router, private AuthenticationService: AuthenticationServiceService, private ngxLoader: NgxUiLoaderService, private snackBar: MatSnackBar, private Administration: AdministrationServiceService) {
    this.seSouvenir = false;
    this.logIn = true;
  }

  ngOnInit(): void {
    this.windowheight = window.innerHeight;
    this.windowidth = window.innerWidth;
    this.souvenirControl.valueChanges.subscribe(value => {
      if (value) {
        this.seSouvenir = true;
        if (this.AuthenticationService.seSouvenirDeMoi() !== undefined) {
          this.loginUtilisateurForm.controls.matricule.patchValue(this.AuthenticationService.seSouvenirDeMoi().matricule);
          this.loginUtilisateurForm.controls.mot2passe.patchValue(this.AuthenticationService.seSouvenirDeMoi().mot2passe);
        }
      } else {
        this.seSouvenir = false;
        this.loginUtilisateurForm.controls.matricule.reset(null);
        this.loginUtilisateurForm.controls.mot2passe.reset(null);
      }
    });
  }


  onConnexion() {
    if (this.loginUtilisateurForm.valid) {
      this.ngxLoader.start();
      this.loginUtilisateur = {
        matricule: this.loginUtilisateurForm.value.matricule,
        mot2passe: this.loginUtilisateurForm.value.mot2passe,
      };
      this.AuthenticationService.login(this.loginUtilisateur).subscribe((response: HttpResponse<CustomUser>) => {
        if (this.seSouvenir) {
          this.AuthenticationService.saveCurrentUser(this.loginUtilisateurForm.value.matricule, this.loginUtilisateurForm.value.mot2passe);
        } else {
          this.AuthenticationService.neSeSouvenirDeMoi();
        }
        const token = response.headers.get(HeaderType.JWT_TOKEN);
        this.AuthenticationService.saveToken(token);
        this.AuthenticationService.addUserToLocalCache(response.body);
        if (response.body.authorities !== null || undefined) {
          this.AuthenticationService.setUserAuthorities(response.body.authorities);
          // this.AuthenticationService.saveUserAuthorities();
        }
        this.router.navigate(['api']);
        this.ngxLoader.stop();
      }, error => {
        this.ngxLoader.stop();
        this.showNotification(this.snackBarFailureLogIn);
      });
    }
  }

  onResetPassword() {
    if (this.resetPasswordUtilisateurForm.valid) {
      this.ngxLoader.start();
      this.Administration.sendNewMessage(this.resetPasswordUtilisateurForm.value.matricule, this.resetPasswordUtilisateurForm.value.email).subscribe(value => {
        this.ngxLoader.stop();
        this.logIn = !this.logIn;
        this.showNotification(this.snackBarSuccessResetPassword);
      }, error => {
        this.ngxLoader.stop();
        this.showNotification(this.snackBarFailureResetPassword);
      });
    }

  }

  showNotification(displayText: string) {
    setTimeout(() => {
      this.snackBar.open(displayText, 'X', {duration: 800});
    });
  }


}
