import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Stat} from'../stat/stat';
import { SessionService } from '../../providers/session-service';
import { StatFormPage } from '../stat/stat-form';
//import { CriteriaListPage } from '../criteria-list/criteria-list';
import { PlayerListPage } from '../player-list/player-list';
import { ActionSheetController } from 'ionic-angular';
import { Session } from '../session/session';
import { Drill } from './drill';
/**
 * Generated class for the SessionList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-drill', 
  templateUrl: 'drill-form.html',
})
export class DrillPage {

  session:Session;
  drill:Drill;
  stats:Stat[] = [];
  saisie = 'player';
  players:string[] = [];
  shownGroups:boolean[] = [];

  constructor(private SessionServ:SessionService,public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController) {
    this.session = navParams.get('session');
    this.drill = navParams.get('drill');
    this.players = this.session.players;
    for (var i=0; i<this.players.length; i++) {
    this.shownGroups[i] = false;
    }
  }

  tab1Root = PlayerListPage;
  tab2Root = PlayerListPage;


  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroups[group] = false;
    } else {
        this.shownGroups[group] = true;
    }
  };
  isGroupShown(group) {
      return this.shownGroups[group];
  };
  
  

}