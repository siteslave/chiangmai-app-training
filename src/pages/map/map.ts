import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  name: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let user: any = this.navParams.get('user');
    this.name = user.name;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

}
