import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProtectedComponent } from './protected.component';
import { LoginComponent } from './login.component';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';

const config = {
  issuer: 'https://dev-133320.okta.com/oauth2/default',
  redirectUri: 'http://localhost:4200/callback',
  clientId: '0oa55giv775Ul3LHL357',
  pkce: true
}

export function onAuthRequired({ oktaAuth, router }) {
  console.log('oktaAuth', oktaAuth)
  console.log('router', router)
  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

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
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ OktaAuthGuard ],
    data: {
      onAuthRequired
    }
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
