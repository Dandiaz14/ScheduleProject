import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  contactos = [];
  nombre = '';
  telefono = '';
  correo = '';
  face = '';
  twitter = '';
  insta = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) {
    let id = this.navParams.get('id');
    console.log(id);
    this.nombre = this.navParams.get('name');
    this.telefono = this.navParams.get('phone');
    this.correo = this.navParams.get('mail');
    this.face = this.navParams.get('facebook');
    this.twitter = this.navParams.get('twitter');
    this.insta = this.navParams.get('instagram');
    this.getContactos(id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  getContactos(id) {
    this.http.get('/contact/?id=' + id.toString())
      .subscribe(data => {
        console.log(data.text());
        this.contactos=data.json();
      }, error1 => {
        console.log('error');
      });
  }
}
