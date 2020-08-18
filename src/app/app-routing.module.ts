import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, Router } from '@angular/router';
import { ProtectedComponent } from './protected.component';
import { LoginComponent } from './login.component';
import { CallbackComponent } from './callback.component';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';

const config = {
  issuer: 'https://dev-133320.okta.com/oauth2/default',
  redirectUri: 'com.okta.dev-133320:/callback',
  clientId: '0oa55hiastFfpXHCv357'
};

export function onAuthRequired(oktaAuth, injector) {
  const router = injector.get(Router);
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
    component: CallbackComponent
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
