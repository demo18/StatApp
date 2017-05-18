import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SessionListPage } from '../session/session-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  GoSessionTraining(){
    this.navCtrl.push(SessionListPage, {
       type: "training"
    });
  }
  GoSessionMatch(){
    this.navCtrl.push(SessionListPage, {
       type: "match"
    });
  }

}
