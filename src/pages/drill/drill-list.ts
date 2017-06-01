import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,ActionSheetController } from 'ionic-angular';
import { SessionService } from '../../providers/session-service';
import { Session } from '../session/session';
import { SessionPage } from '../session/session-form';
import { DrillPage } from '../drill/drill-form';
import { Drill } from './drill';


/**
 * Generated class for the StatForm page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-drill-list',
  templateUrl: 'drill-list.html',
})
export class DrillListPage {

  drills:Drill[];
  date = new Date().toISOString();
  session:Session;

  constructor(private alertCtrl: AlertController,private SessionServ:SessionService,public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController) {
    let param = navParams.get('session');
    // si new session
    if(param==0){
      this.session = new Session(this.date,"training",0,[],[]);
      this.session.players = navParams.get('players');
    }
    else{
      this.session = navParams.get('session');
    }
    this.drills = this.session.drills;
  }


  presentActionSheet(session:Session) {
   let actionSheet = this.actionSheetCtrl.create({
     title: 'Options',
     buttons: [
       {
         text: 'Enregistrer',
         icon:'checkmark',
         handler: () => {
           this.SessionServ.saveSession(this.session);
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

  GoDrillPage(session:Session,drill:Drill,isNew:boolean){
    this.SessionServ.saveSession(this.session);
    this.navCtrl.push(DrillPage, {
       session: session,
       drill:drill,
       isNew:isNew
    });
  }

  newDrill() {
    let alert = this.alertCtrl.create();
    alert.setTitle('SELECTIONNER UN EXERCICE');
    alert.addInput({
      type: 'checkbox',
      label: 'NOUVEAU',
      value: 'NOUVEAU'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'BUNK',
      value: 'BUNK'
    });

    alert.addButton('Annuler');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        this.GoDrillPage(this.session,data,true);
      }
    });
    alert.present();
  }

}
