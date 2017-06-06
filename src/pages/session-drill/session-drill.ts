import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { SessionService } from '../../providers/session-service';
import { ActionSheetController } from 'ionic-angular';
import { _Session } from '../../models/_session';
import { _Drill } from '../../models/_drill';
import {_Stat} from'../../models/_stat';
/**
 * Generated class for the SessionList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'session-drill', 
  templateUrl: 'session-drill.html',
})
export class SessionDrill {

  session:_Session;
  sessionId:number;
  drillId:number;
  drill:_Drill = new _Drill();
  stats:_Stat[] = [];
  saisie = 'player';
  criterias:{name:string,type:string}[] = [];
  shownGroups:boolean[] = [];

  constructor(private alertCtrl: AlertController,private SessionServ:SessionService,public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController) {

    //view var init
    this.sessionId = navParams.get('sessionId');
    this.drillId = navParams.get('drillId');
    this.session = this.SessionServ.getSession(this.sessionId);
    console.log(this.session);
    //NEW DRILL
    if(navParams.get('drillId')==-1){
      this.drill = new _Drill(navParams.get('drillName'),[{name:'bille touche',type:'nombre'}],[]);
      this.drillId =  this.SessionServ.addDrill(this.sessionId,this.drill);
      this.criterias = this.drill.criterias;
      for(var i=0; i<this.session.players.length; i++){
        for(var j=0; j<this.criterias.length; j++){
          this.drill.stats.push(new _Stat(this.session.players[i],this.criterias[j],0,0,0));
        }
      }
    }
    //EXISTING DRILL
    else{
      this.drill = this.session.drills[this.drillId];
      this.criterias = this.drill.criterias;
    }
    console.log("drill "+this.drill.stats[0].player);
    
    //collapse menu init
    for (var i=0; i< Math.max(this.session.players.length,this.criterias.length); i++) {
      this.shownGroups[i] = true;
    }
    this.SessionServ.updateSession(this.session,this.sessionId);
    console.log(this.session);
  }

  addStat(id) {
    let alert = this.alertCtrl.create();
    alert.setTitle('SAISIE');
    let active:boolean = false;
    for(let i=0;i<=5;i++){
      i==1 ? active=true:active=false;
      alert.addInput({
        type: 'radio',
        label: i.toString(),
        value: i.toString(),
        checked: active
      });
    }

    alert.addButton('Annuler');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        this.drill.stats[id].value = data[0];
        this.SessionServ.updateSession(this.session,this.sessionId);
      }
    });
    alert.present();
  }

  more() {
   let actionSheet = this.actionSheetCtrl.create({
     title: 'Options',
     buttons: [
       {
         text: 'Supprimer',
         icon:'trash',
         handler: () => {
           this.SessionServ.deleteDrill(this.sessionId,this.drillId);
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