import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/services/authentication.service';
import {AuthenticationRequest} from '../../services/models/authentication-request';
import {TokenService} from '../../services/token/token.service';
import { KeycloakService } from 'src/app/services/keycloak/keycloak.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // authRequest: AuthenticationRequest = {email: '', password: ''};
  // errorMsg: Array<string> = [];

  constructor(
    private keycloakService: KeycloakService
  ) {
  }
  async ngOnInit(): Promise<void> {
    await this.keycloakService.init();
    await this.keycloakService.login();
  }

  // login() {
  //   this.errorMsg = [];
  //   this.authService.authenticate({
  //     body: this.authRequest
  //   }).subscribe({
  //     next: (res) => {
  //       this.tokenService.token = res.token as string;
  //       this.router.navigate(['books']);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //       if (err.error.validationErrors) {
  //         this.errorMsg = err.error.validationErrors;
  //       } else {
  //         this.errorMsg.push(err.error.errorMsg);
  //       }
  //     }
  //   });
  // }

  // register() {
  //   this.router.navigate(['register']);
  // } Plus besoin car c'est maintenant notre service keycloak qui gère ca
}
