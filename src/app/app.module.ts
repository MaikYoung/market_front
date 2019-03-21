import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserService } from '../providers/user-service';
import { TokenService } from '../providers/token-service';
import { APIService } from '../providers/api-service';
import { TripService } from '../providers/trip-service';
import { NotificationService } from '../providers/notification-service';
import { IonicStorageModule } from '@ionic/storage';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestsInterceptor } from '../providers/interceptor';
import { MedalsService } from '../providers/medals-service';
import { PointsService } from '../providers/points-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    TokenService,
    APIService,
    TripService,
    NotificationService,
    MedalsService,
    PointsService,
    IonicStorageModule,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: RequestsInterceptor, 
      multi: true, 
      deps: [Injector]
    }
  ]
})
export class AppModule {}
