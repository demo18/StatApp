import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Sessions } from '../sessions/sessions';
import { Parameters } from '../parameters/parameters';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  GoSessionTraining(){
    this.navCtrl.push(Sessions, {
       type: "training"
    });
  }
  GoSessionMatch(){
    this.navCtrl.push(Sessions, {
       type: "match"
    });
  }

  GoParam(){
    this.navCtrl.push(Parameters, {
       type: "match"
    });
  }

}
