import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

import { Plugins } from '@capacitor/core';

const { SplashScreen } = Plugins;

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.authService.startUpAsync();
      if (this.platform.is('mobile') && !this.platform.is('mobileweb')) {
        SplashScreen.hide();
      }
      
    });
  }
}
