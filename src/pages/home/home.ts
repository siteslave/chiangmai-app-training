import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
  
export class HomePage {
  fruits: Array<{ id: number, name: string }> = [];

  constructor(public navCtrl: NavController) {
    this.fruits.push({ id: 1, name: 'Apple' });
    this.fruits.push({ id: 2, name: 'Banana' });
    this.fruits.push({ id: 3, name: 'Orange' });
  }

  showName(fruit: any) {
    console.log(fruit);
    console.log(fruit.id);
    console.log(fruit.name);
  }

}

