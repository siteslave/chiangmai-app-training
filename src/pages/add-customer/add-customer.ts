import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from 'ionic-angular';
import { Customer } from '../../providers/customer';

@Component({
  selector: 'page-add-customer',
  templateUrl: 'add-customer.html',
  providers: [Customer]
})
export class AddCustomerPage {

  groups: Array<any>;
  token: string;  
  customerTypeId: number;

  sexes: Array<{ id: number, name: string }>;
  sex: string;

  imageData: string;
  base64Image: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  customerId: number;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public customerProvider: Customer,
    public alertCtrl: AlertController
  ) { 
    this.token = localStorage.getItem('token');
    this.sexes = [
      { id: 1, name: 'ชาย' },
      { id: 2, name: 'หญิง' }
    ];
  }

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Please wait..'
    });
    loading.present();

    this.customerProvider.getGroups(this.token)
      .then((data: any) => {
        this.groups = data.rows;
        loading.dismiss();
      });
  }  

  save() {
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Please wait..'
    });
    loading.present();
      
    if (this.firstName && this.lastName && this.customerTypeId && this.sex) {
      let customer: any = {
        first_name: this.firstName,
        last_name: this.lastName,
        sex: this.sex,
        customer_type_id: this.customerTypeId,
        telephone: this.telephone,
        email: this.email,
        image: this.imageData
      };

      this.customerProvider.saveCustomer(this.token, customer)
        .then((data: any) => {
          loading.dismiss();
          this.navCtrl.pop();
        }, (error) => {
          loading.dismiss();
          console.error(error);
        });
    } else {
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'กรุณากรอกรายละเอียดที่จำเป็นให้ครบถ้วน!',
        buttons: ['OK']
      });
      alert.present();
    }
  }

}
