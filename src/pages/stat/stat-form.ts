import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SessionService } from '../../providers/session-service';
import { Stat } from './stat';
import { Session } from '../session/session';
import { SessionPage } from '../session/session-form';

/**
 * Generated class for the StatForm page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-stat-form',
  templateUrl: 'stat-form.html',
})
export class StatFormPage {

  constructor(private SessionServ:SessionService,public navCtrl: NavController, public navParams: NavParams) {
  }
players = ['joueur 1', 'joueur 2'];
criterias = ['prebunk', 'penalité'];
session:Session =  this.navParams.get('session');
value = 0;





}
