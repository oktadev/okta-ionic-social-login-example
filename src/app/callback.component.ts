import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
    template: `<div>{{error}}</div>`
  })
  export class CallbackComponent implements OnInit {
    error: string;
  
    constructor(private okta: OktaAuthService) {}
  
    async ngOnInit() {
      /**
       * Handles the response from Okta and parses tokens.
       */
      return this.okta.handleAuthentication()
        .then(() => {
          /**
           * Navigate back to the saved uri, or root of application.
           */
          const fromUri = this.okta.getFromUri();
          console.log('fromUri: ' + fromUri)
          //window.location.replace(fromUri);
        })
        .catch(e => {
          this.error = e.toString();
        });
    }
  }