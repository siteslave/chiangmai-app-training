import { Component } from '@angular/core';

import {
  NavController,
  NavParams,
  Platform,
  LoadingController,
  ToastController,
  AlertController
} from 'ionic-angular';
import { SQLite, CallNumber } from 'ionic-native';
import { Contact } from '../../providers/contact';

import { AddContactPage } from '../add-contact/add-contact';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [Contact]
})
export class ContactPage {

  contacts: Array<any>;
  db: SQLite;
  
  constructor(
    public navCtrl: NavController,
    private contactProvider: Contact,
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.platform.ready().then(() => {
      this.db = new SQLite();
      this.db.openDatabase({
        name: 'contact.db',
        location: 'default'
      }).then(() => {
        this.getContacts();
       });
    })
   }

  add() {
    this.navCtrl.push(AddContactPage);
  }

  edit(contact: any) {
    this.navCtrl.push(AddContactPage, contact);
  }
  
  getContacts() {
    let loading = this.loadingCtrl.create({
        spinner: 'dots',
        content: 'Please wait..'
      });
      loading.present();
      this.contactProvider.getContacts(this.db)
        .then((rows: any) => {
          loading.dismiss();
          this.contacts = [];
          if (rows.length > 0) {
            for (let i = 0; i < rows.length; i++) {
              this.contacts.push({
                id: rows.item(i).id,
                first_name: rows.item(i).first_name,
                last_name: rows.item(i).last_name,
                sex: rows.item(i).sex,
                telephone: rows.item(i).telephone,
                email: rows.item(i).email
              });
            }
          }
        }, error => {
          loading.dismiss();
          console.log(error);
        });
  }
  
  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.db = new SQLite();
      this.db.openDatabase({
        name: 'contact.db',
        location: 'default'
      }).then(() => {
        this.getContacts();
      });
    });
  }

  remove(contact: any) {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: `ต้องการลบรายการนี้ [${contact.first_name} ${contact.last_name}] ใช่หรือไม่?`,
      buttons: [
        {
          text: 'ใช่,ต้องการลบ',
          handler: () => {
            this.contactProvider.remove(this.db, contact.id)
              .then(() => {
                let toast = this.toastCtrl.create({
                  message: 'Deleted!',
                  duration: 3000
                });
                toast.present();
                // get contact
                this.getContacts();
              });
          }
        },
        { text: 'ไม่ใช่', handler: () => { }
        }
      ]
    });
    confirm.present();
  }

  search(event) {
    let query = event.target.value;
    this.contactProvider.search(this.db, query)
      .then((rows: any) => {
            this.contacts = [];
            if (rows.length > 0) {
              for (let i = 0; i < rows.length; i++) {
                this.contacts.push({
                  id: rows.item(i).id,
                  first_name: rows.item(i).first_name,
                  last_name: rows.item(i).last_name,
                  sex: rows.item(i).sex,
                  telephone: rows.item(i).telephone,
                  email: rows.item(i).email
                });
              }
            }
      });
   }
  
  
}
