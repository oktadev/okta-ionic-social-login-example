import { Component, NgZone, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';

@Component({
  selector: 'app-secure',
  template: `
    <!-- Container to inject the Sign-In Widget -->
    <div id="okta"></div>
  `,
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  widget = new OktaSignIn({
    el: '#okta',
    baseUrl: 'https://dev-2530788.okta.com',
    clientId: '0oa1e99tacCh5DE7I5d7',
    redirectUri: 'com.okta.dev-2530788:/callback'
  });

  constructor(private oktaAuth: OktaAuthService, private router: Router, private ngZone: NgZone) {

    // Show the widget when prompted, otherwise remove it from the DOM.
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        switch (event.url) {
          case '/login':
            break;
          case '/protected':
            break;
          default:
            this.widget.remove();
            break;
        }
      }
    });
  }

  ngOnInit() {
    // There are no tokens in the URL, render the Sign-In Widget.
    this.widget.showSignInToGetTokens({
      scopes: ['openid', 'profile']
    }).then(tokens => {
        console.log('tokens', tokens);
        alert('success!');
      }
    ).catch(error => {
      alert('error:' + error);
    });

  }
}
