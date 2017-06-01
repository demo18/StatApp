import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Stat} from'../stat/stat';
import { SessionService } from '../../providers/session-service';
import { StatFormPage } from '../stat/stat-form';
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
  drill:Drill = new Drill();
  stats:Stat[] = [];
  saisie = 'player';
  criterias:{name:string,type:string}[] = [];
  shownGroups:boolean[] = [];

  constructor(private SessionServ:SessionService,public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController) {

    //view var init
    
    this.session = navParams.get('session');
    let isNew = navParams.get('isNew');
   
    //NEW DRILL
    if(isNew){
      this.drill = new Drill(0,navParams.get('drill'),[{name:'bille touche',type:'nombre'}],[]);
      this.SessionServ.addDrill(this.session,this.drill);
      this.criterias = this.drill.criterias;
      for(var i=0; i<this.session.players.length; i++){
        for(var j=0; j<this.criterias.length; j++){
          this.drill.stats.push(new Stat(this.session.players[i],this.criterias[j],0,this.session.localID,0));
        }
      }
    }
    //EXISTING DRILL
    else{
      this.drill = navParams.get('drill');
      this.criterias = this.drill.criterias;
    }
    console.log("drill "+this.drill.stats[0].player);
    
    //collapse menu init
    for (var i=0; i< Math.max(this.session.players.length,this.criterias.length); i++) {
      this.shownGroups[i] = true;
    }
    this.SessionServ.saveSession(this.session);
    console.log(this.session);
  }

  // addStat(player:any,criteria:any,value:any){
  //   let stat = new Stat(player,criteria,0,this.session.localID,value);
  //   this.SessionServ.addStat(this.session,stat);
  // }

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