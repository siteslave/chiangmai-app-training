import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class User {
  url: string = 'http://jsonplaceholder.typicode.com';

  constructor(public http: Http) { }
  
  getUsers() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/users`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
    });
  }
}
