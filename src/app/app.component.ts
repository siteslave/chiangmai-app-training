import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;

  constructor(platform: Platform, public events: Events) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();

      let token = localStorage.getItem('token');
      if (token) this.rootPage = TabsPage;
      else this.rootPage = LoginPage;

      events.subscribe('logout', () => {
        console.log('Logout');
        localStorage.removeItem('token');
        this.rootPage = LoginPage;
      });

    });
  }
}
