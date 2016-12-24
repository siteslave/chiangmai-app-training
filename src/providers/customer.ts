import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Customer {

  constructor(public http: Http, @Inject('API_URL') private url: string) { }
  
  getCustomers(token) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });
      this.http.get(`${this.url}/customers`, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
    });
  }
}
