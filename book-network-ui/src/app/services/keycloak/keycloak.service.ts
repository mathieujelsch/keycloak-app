import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './user-profile';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;

  private _profile: UserProfile | undefined;

  get keycloak() {   // c'est simplement pour définir un getter faire la redirection de la login page sur keycloak
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:9090',
        realm: 'book-social-network',
        clientId: 'bsn'
      });
    }
    return this._keycloak;
  }

  get profile(): UserProfile | undefined {   // c'est simplement pour définir un getter
    return this._profile;
  }
  
  constructor() { }

  async init() {
    console.log("authenticated the user ..")
    const authenticated = await this.keycloak?.init({
      onLoad: 'login-required'    // c'est la redirection sur le forms login
    });

    if (authenticated) {
      this._profile = (await this.keycloak?.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak?.token; // on store le token, ici on en a pas vraiment besoin pour le moment
    }
  }

  login() {
    return this.keycloak?.login();
  }

  logout() {
    return this.keycloak?.logout({redirectUri: 'http://localhost:4200'}); //redirection page accueil apres logout
    // return this.keycloak?.accountManagement();
  }
}
