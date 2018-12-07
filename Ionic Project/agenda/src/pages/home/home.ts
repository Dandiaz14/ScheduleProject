import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";
import {ContactPage} from "../contact/contact";
import {NuevoPage} from "../nuevo/nuevo";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  contactPage = ContactPage;
  nuevoPage = NuevoPage;
  usuario = '';
  password = '';
  agenda = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http:Http) {
    this.usuario = this.navParams.get('usuario');
    this.password = this.navParams.get('password');
    this.getContacts();
  }

  clickContact(i){
    this.navCtrl.push(this.contactPage, i);
  }

  clickAddNuevo(){
    this.navCtrl.push(this.nuevoPage, {"usuario":this.usuario,"password":this.password});
  }

  getContacts() {
    this.http.get('/agenda/?usuario=' + this.navParams.get('usuario') + '&password=' + this.navParams.get('password'))
      .subscribe(data => {
        console.log(data.text());
        this.agenda=data.json();
      }, error1 => {
        console.log('error');
      });
  }
}
