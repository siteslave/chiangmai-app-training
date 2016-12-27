import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { MainPage } from '../pages/main/main';
import { MapPage } from '../pages/map/map';
import { TabsPage } from '../pages/tabs/tabs';
import { ContactPage } from '../pages/contact/contact';
import { MessagePage } from '../pages/message/message';
import { SettingPage } from '../pages/setting/setting';
import { LoginPage } from '../pages/login/login';
import { AddCustomerPage } from '../pages/add-customer/add-customer';
import { AddContactPage } from '../pages/add-contact/add-contact';

import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    MapPage,
    TabsPage,
    ContactPage,
    MessagePage,
    SettingPage, 
    LoginPage,
    AddCustomerPage,
    AddContactPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCdUds26ek02PmRgVhqwRVvwWZ_KMoGMU8'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, 
    MainPage,
    MapPage,
    TabsPage,
    ContactPage,
    MessagePage,
    SettingPage,
    LoginPage,
    AddCustomerPage,
    AddContactPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: 'API_URL', useValue: 'http://192.168.43.224:3000' }
  ]
})
export class AppModule {}
