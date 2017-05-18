import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Session} from'./session';
import {Stat} from'../stat/stat';
import { SessionService } from '../../providers/session-service';
import { StatFormPage } from '../stat/stat-form';
//import { CriteriaListPage } from '../criteria-list/criteria-list';
import { PlayerListPage } from '../player-list/player-list';
import { ActionSheetController } from 'ionic-angular'
/**
 * Generated class for the SessionList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-session', 
  templateUrl: 'session-form.html',
})
export class SessionPage {

  session:Session;
  stats:Stat[] = [];
  date = new Date().toISOString();
  context = ['Match', 'Training Match'];

  constructor(private SessionServ:SessionService,public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController) {
    let param = navParams.get('session');
    console.log(param);
    if(param==0){
      this.session = new Session(this.date,this.context[0],0,[],[]);
    }
    else{
      this.session = navParams.get('session');
      this.stats = this.session.stats;
    }
  }
  
  saveSession(){
    //NEW SESSION
    if(this.session.localID==0){
      this.session.localID = this.SessionServ.sessions.length+1;
      this.SessionServ.addSession(this.session);
    }
    //EXISTING SEESION
    else{
      this.SessionServ.updateSession(this.session);
    } 
  }

  GoStatPage(){
    this.saveSession();
    this.navCtrl.push(StatFormPage, {
       session: this.session
    });
  }

  presentActionSheet(session:Session) {
   let actionSheet = this.actionSheetCtrl.create({
     title: 'Options',
     buttons: [
       {
         text: 'Enregistrer',
         icon:'checkmark',
         handler: () => {
           this.saveSession();
         }
       },
       {
         text: 'Supprimer',
         icon:'trash',
         handler: () => {
           this.SessionServ.deleteSession(this.session);
         }
       },
       {
         text: 'Annuler',
         icon:'close',
         role: 'cancel',
         handler: () => {
           
         }
       }
     ]
   });

   actionSheet.present();
 }

}