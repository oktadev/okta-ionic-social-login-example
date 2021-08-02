import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProtectedComponent } from './protected.component';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';

const redirectScheme = window.location.origin.includes('capacitor://') ?
  'com.okta.dev-2530788:' : window.location.origin;

const config = {
  issuer: 'https://dev-2530788.okta.com/oauth2/default',
  redirectUri: redirectScheme + '/callback',
  clientId: '0oa1e99tacCh5DE7I5d7'
};

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'callback',
    component: OktaCallbackComponent
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ OktaAuthGuard ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    OktaAuthModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: config },
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
