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
    baseUrl: 'https://dev-133320.okta.com',
    clientId: '0oa55giv775Ul3LHL357',
    redirectUri: window.location.origin + '/callback'
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
    this.widget.renderEl({el: '#okta'}, async (res) => {
        if (res.status === 'SUCCESS') {
          this.oktaAuth.getTokenManager().add('accessToken', res.tokens.accessToken);
          this.oktaAuth.getTokenManager().add('idToken', res.tokens.idToken);
          this.ngZone.run(() => {
            this.widget.hide();
            this.router.navigate(['/'], {replaceUrl: true});
          });
          //this.oktaAuth.handleAuthentication();
        }
      }, (err) => {
        throw err;
      }
    );
  }
}
