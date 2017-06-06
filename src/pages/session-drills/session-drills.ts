import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,ActionSheetController } from 'ionic-angular';
import { SessionService } from '../../providers/session-service';
import { DrillService } from '../../providers/drill-service';
import { Sessions } from '../sessions/sessions';
import { SessionDrill } from '../session-drill/session-drill';
import { Drill } from '../drill/drill';
import { _Drill } from '../../models/_drill';
import { _Session } from '../../models/_session';


/**
 * Generated class for the StatForm page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'session-drills',
  templateUrl: 'session-drills.html',
})
export class SessionDrills {

  sessionDrills:_Drill[];
  drills:_Drill[];
  date = new Date().toISOString();
  session:_Session;
  sessionId:number;

  constructor(private alertCtrl: AlertController,private SessionServ:SessionService,private DrillServ:DrillService,public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController) {
    //this.drills = this.DrillServ.getdrills();
    this.DrillServ.drillObs.subscribe({
      next: data => this.drills = data
    });
    this.DrillServ.load();
    this.sessionId = navParams.get('sessionId');
    
    // si new session
    if(this.sessionId==-1){
      this.session = new _Session(this.date,"training",[],[]);
      this.session.players = navParams.get('players');
      this.save();
    }
    else{
      this.session = this.SessionServ.getSession(this.sessionId);
    }
    this.sessionDrills = this.session.drills;
  }


  more() {
   let actionSheet = this.actionSheetCtrl.create({
     title: 'Options',
     buttons: [
       {
         text: 'Supprimer',
         icon:'trash',
         handler: () => {
           this.SessionServ.deleteSession(this.sessionId);
           this.navCtrl.pop();
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

  save(){
    //NEW SEESION
    if(this.sessionId==-1){
      this.sessionId = this.SessionServ.addSession(this.session);
    }
    //EXISTING SEESION
    else{
      this.SessionServ.updateSession(this.session,this.sessionId);
    } 
  }

  GoDrillPage(drillId:number,drillName:string){
    this.save();
    this.navCtrl.push(SessionDrill, {
       sessionId: this.sessionId,
       drillName:drillName,
       drillId:drillId,
    });
  }
  GoNewDrillPage(drillId:number){
    this.navCtrl.push(Drill, {
       sessionId: this.sessionId,
       drillId:drillId
    });
  }

  newDrill() {
    let alert = this.alertCtrl.create();
    alert.setTitle('SELECTIONNER UN EXERCICE');
    alert.addInput({
      type: 'radio',
      label: 'NOUVEAU',
      value: 'NOUVEAU'
    });
    
    for(let i=0;i<this.drills.length;i++){
      alert.addInput({
        type: 'radio',
        label: this.drills[i].name,
        value: this.drills[i].name
      });
    }
    alert.addButton('Annuler');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        data =='NOUVEAU' ? this.GoNewDrillPage(-1) : this.GoDrillPage(-1,data);
      }
    });
    alert.present();
  }

}
