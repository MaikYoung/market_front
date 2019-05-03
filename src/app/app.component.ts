import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { UserService } from '../providers/user-service';
import { LoginPage } from '../pages/login/login';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    userService: UserService,
    translate: TranslateService
    ) {
    platform.ready().then(() => {
    translate.setDefaultLang('es');
    translate.use('es');
    userService.isLogged().then(token => {
      console.log("token",token)
      if(token){
        this.rootPage = TabsPage
      }else{
        this.rootPage = LoginPage
      }
    })
      

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
