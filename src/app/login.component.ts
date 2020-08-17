import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart} from '@angular/router';

import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';

@Component({
  selector: 'app-secure',
  template: `
    <!-- Container to inject the Sign-In Widget -->
    <div id="okta-signin-container"></div>
  `
})
export class LoginComponent {
  signIn;
  widget = new OktaSignIn({
    baseUrl: 'https://dev-133320.okta.com',
    clientId: '0oa55hiastFfpXHCv357',
    redirectUri: 'com.okta.dev-133320:/callback',
    //authParams: {
    //  issuer: "https://dev-133320.okta.com/oauth2/default",
    //  responseType: ['token', 'id_token'],
    //  display: 'page'
    //}
  });

  constructor(oktaAuth: OktaAuthService, router: Router) {
    this.signIn = oktaAuth;

    // Show the widget when prompted, otherwise remove it from the DOM.
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        switch(event.url) {
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
        this.widget.renderEl({
            el: '#okta-signin-container'},
            (res) => {
                console.log('res', res);
                if (res.status === 'SUCCESS') {
                    console.log('Do something with this sessionToken', res.session.token);
                  } else {
                  // The user can be in another authentication state that requires further action.
                  // For more information about these states, see:
                  //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
                  }
            },
            (err) => {
              throw err;
            }
          );

    
  }
}