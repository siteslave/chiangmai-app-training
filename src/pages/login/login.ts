import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Login } from '../../providers/login';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Login]
})
export class LoginPage {
  username: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private loginProvider: Login
  ) { }

  doLogin() {
    let loader = this.loadingCtrl.create({
      content: 'Logging...',
      spinner: 'dots'
    });
    loader.present();
    
    this.loginProvider.doLogin(this.username, this.password)
      .then((data: any) => {
        loader.dismiss();
        if (data.ok) {
          let token = data.token;
          localStorage.setItem('token', token);
          this.navCtrl.setRoot(TabsPage);
        }
      }, (error) => {
        loader.dismiss();
        console.log(error);
      });
  }

}
