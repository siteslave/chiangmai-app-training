import { Component } from '@angular/core';
import { Geolocation } from 'ionic-native';

import {
  NavController,
  NavParams,
  LoadingController,
  ToastController
} from 'ionic-angular';
import { Customer } from '../../providers/customer';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  providers: [Customer]
})
export class MapPage {
  customerLat: number;
  customerLng: number;
  currentLat: number;
  currentLng: number;
  lat: number;
  lng: number;
  zoomLevel: number = 18;
  customerName: string;
  customerId: number;

  token: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public customerProvider: Customer
  ) {
    this.lat = 16.4321938;
    this.lng = 102.8236214;

    this.token = localStorage.getItem('token');
    
    let customer = this.navParams.get('customer');
    this.customerId = customer.id;
    this.customerName = `${customer.first_name} ${customer.last_name}`;
  }

  mapClick(event) {
    this.customerLat = event.coords.lat;
    this.customerLng = event.coords.lng;
  }

  save() {

    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      spinner: 'dots'
    });
    loader.present();

    this.customerProvider.saveMap(this.token, this.customerId,
      this.customerLat, this.customerLng)
      .then((data: any) => {
        loader.dismiss();
        if (data.ok) {
          let toast = this.toastCtrl.create({
            message: 'บันทึกพิกัดเสร็จเรียบร้อยแล้ว!',
            duration: 8000
          });
         toast.present();
        }
      }, (error) => {
        loader.dismiss();
        console.log(error);
      });
  }

  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      spinner: "dots"
    });
    loader.present();
    this.customerProvider.getMap(this.token, this.customerId)
      .then((data: any) => {
        Geolocation.getCurrentPosition().then((resp) => {
            loader.dismiss();
            this.currentLat = resp.coords.latitude;
            this.currentLng = resp.coords.longitude;
            if (data.latLng.lat && data.latLng.lng) {
              this.customerLat = data.latLng.lat;
              this.customerLng = data.latLng.lng;
              this.lat = data.latLng.lat;
              this.lng = data.latLng.lng;
            } else {
              this.lat = resp.coords.latitude;
              this.lng = resp.coords.longitude;
            }
          })
       }, (error) => {
         loader.dismiss();
         console.log(error);
      });
  }

}
