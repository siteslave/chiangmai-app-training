import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.lat = 16.4321938;
    this.lng = 102.8236214;
  }

}
