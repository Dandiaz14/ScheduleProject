import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";
import {HomePage} from "../home/home";

/**
 * Generated class for the NuevoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nuevo',
  templateUrl: 'nuevo.html',
})
export class NuevoPage {
  home = HomePage;
  usuario = '';
  password = '';
  name = '';
  phone = '';
  mail = '';
  facebook = '';
  twitter = '';
  instagram = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http:Http, public alertCrl:AlertController) {
    this.usuario = this.navParams.get('usuario');
    this.password = this.navParams.get('password');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoPage');
  }

  clickAddContact(){
    console.log("Click Add Contact");
    console.log(this.usuario);
    console.log(this.password);
    console.log(this.name);

    this.http.get('/nuevo/?usuario=' + this.usuario + '&password=' + this.password + '&name=' + this.name + '&phone=' + this.phone + '&mail=' + this.mail + '&facebook=' + this.facebook + '&twitter=' + this.twitter + '&instagram=' + this.instagram)
      .subscribe( data => {
          console.log(data.text());
          console.log(data.text());
          console.log(data.text());
          console.log(data.text());
          if(data.text() == "True"){
            //Mandar siguiente pagina
            this.navCtrl.setRoot(this.home, {"usuario": this.usuario, "password": this.password});
          }
          else{
            //Mandar alerta
            this.navCtrl.setRoot(this.home, {"usuario": this.usuario, "password": this.password});
          }
        }, error => {
          console.log("error");
          const alerta =  this.alertCrl.create(
            {
              title: 'Oops!',
              subTitle: 'Error, no hay conexión',
              buttons: ['Ok']
            }
          );
          alerta.present();
        }
      );
  }

}
