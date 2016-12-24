import { Component } from '@angular/core';
import {
  Events,
  NavController,
  NavParams,
  LoadingController
} from 'ionic-angular';

import { MapPage } from '../map/map';
import { Customer } from '../../providers/customer';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  providers: [Customer]
})
export class MainPage {
  customers: Array<any> = [];
  token: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: Customer,
    public loadingCtrl: LoadingController,
    public events: Events
  ) { 
    this.token = localStorage.getItem('token');
  }

  logout() {
    this.events.publish('logout');
  }

  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      spinner: 'dots',
      content: "Please wait..."
    });
    loader.present();

    this.customerProvider.getCustomers(this.token)
      .then((res: any) => {
        let data = res.rows;
        this.customers = data;
        loader.dismiss();
      }, (error) => {
        loader.dismiss();
        console.log(error);
      });
  } 
  
  goDetail(customer: any) {
    this.navCtrl.push(MapPage, { customer: customer });
  } 

}
