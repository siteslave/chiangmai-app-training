import { Component } from '@angular/core';
import {
  Events,
  NavController,
  NavParams,
  LoadingController,
  ActionSheetController,
  Platform,
  AlertController
} from 'ionic-angular';

import { MapPage } from '../map/map';
import { Customer } from '../../providers/customer';
import { AddCustomerPage } from '../add-customer/add-customer';

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
    public events: Events,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public alertCtrl: AlertController
  ) { 
    this.token = localStorage.getItem('token');
  }

  add() {
    this.navCtrl.push(AddCustomerPage);
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
        this.customers = [];
        let data = res.rows;
        data.forEach((v: any) => {
            let image = v.image ? `data:image/jpeg;base64,${v.image}` : null;
            let customer: any = {
              id: v.id,
              first_name: v.first_name,
              last_name: v.last_name,
              sex: v.sex,
              customer_type_id: v.customer_type_id,
              image: image,
              telephone: v.telephone,
              email: v.email
            }
            this.customers.push(customer);
        });
        loader.dismiss();
      }, (error) => {
        loader.dismiss();
        console.log(error);
      });
  }
  
  search(event) {
    let query = event.target.value;
    this.customers = [];
    this.customerProvider.search(this.token, query)
      .then((data: any) => {
        if (data.ok) {
          data.rows.forEach((v: any) => {
            let image = v.image ? `data:image/jpeg;base64,${v.image}` : null;
            let customer: any = {
              id: v.id,
              first_name: v.first_name,
              last_name: v.last_name,
              sex: v.sex,
              customer_type_id: v.customer_type_id,
              image: image,
              telephone: v.telephone,
              email: v.email
            }
            this.customers.push(customer);
          });
        }
      }, (error) => {
        console.error(error);
      });
  }

  removeConfirm(customer: any) {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'ต้องการลบรายการนี้ ใช่หรือไม่?',
      buttons: [
        { text: 'ยกเลิก', handler: () => { }},
        {
          text: 'ลบข้อมูล',
          handler: () => {
            this.customerProvider.remove(this.token, customer.id)
              .then((data: any) => {
                if (data.ok) {
                  this.ionViewWillEnter();
                }
              }, (error) => {
                console.log(error);
              });
          }
        }
      ]
    });
    confirm.present();
  }  

   showMenu(customer: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Action menu',
      buttons: [
        {
          text: 'ลบข้อมูล',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash': null,
          handler: () => { 
            this.removeConfirm(customer);
          }
        },
        {
          text: 'แก้ไข',
          icon: !this.platform.is('ios') ? 'create': null,
          handler: () => {
            this.navCtrl.push(AddCustomerPage, { id: customer.id });
          }
        },
        {
          text: 'ดู/กำหนด แผนที่',
          icon: !this.platform.is('ios') ? 'map': null,
          handler: () => { }
        },
        {
          text: 'โทร',
          icon: !this.platform.is('ios') ? 'call': null,
          handler: () => { }
        },
        {
          text: 'ยกเลิก',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close': null,
          handler: () => { }
        }
      ]
    });
    actionSheet.present();
  }


  goDetail(customer: any) {
    this.navCtrl.push(MapPage, { customer: customer });
  } 

}
