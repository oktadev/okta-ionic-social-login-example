import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public oktaAuth: OktaAuthService, public router: Router) {
    console.log('tab1 constructor')
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
  }

  ionViewDidEnter() {
    console.log('tabs1 page here...');
  }

  isAuthenticated: boolean;

  async ngOnInit() {
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    console.log('authenticated', this.isAuthenticated);
  }

  login() {
    this.oktaAuth.loginRedirect('/profile');
  }

  async logout() {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.logout();
    this.router.navigateByUrl('/');
  }
}
