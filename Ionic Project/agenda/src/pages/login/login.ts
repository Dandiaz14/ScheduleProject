import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";
import {Http} from "@angular/http";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  home = HomePage;

  usuario = '';
  password = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  clickHome(){
    console.log("Click Home");
    console.log(this.usuario);
    console.log(this.password);

    this.http.get('/login/?usuario=' + this.usuario + '&password=' + this.password)
      .subscribe( data => {
          console.log(data.text());
          if(data.text() == "True"){
            //Mandar siguiente pagina
            this.navCtrl.setRoot(this.home, {usuario: this.usuario, password: this.password});
          }
          else{
            //Mandar alerta
            const alerta =  this.alertCrl.create(
              {
                title: 'Oops!',
                subTitle: 'Usuario/Contraseña incorrectos',
                buttons: ['Ok']
              }
            );
            alerta.present();
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
