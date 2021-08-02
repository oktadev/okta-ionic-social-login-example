import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  isAuthenticated: boolean;

  constructor(public oktaAuth: OktaAuthService, public router: Router) {
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit() {
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  async login() {
    await this.oktaAuth.signInWithRedirect();
  }

  async logout() {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.signOut();
  }
}
