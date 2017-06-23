import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Drills } from '../drills/drills';
import { Criterias } from '../criterias/criterias';

@Component({
  selector: 'parameters',
  templateUrl: 'parameters.html'
})
export class Parameters {

  constructor(public navCtrl: NavController) {

  }

  GoDrills(){
    this.navCtrl.push(Drills, {
    });
  }
  GoCriterias(){
    this.navCtrl.push(Criterias, {
    });
  }

  GoPref(){
    
  }

}
