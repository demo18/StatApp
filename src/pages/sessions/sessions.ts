import { Component } from '@angular/core';
import { AlertController ,NavController,NavParams, PopoverController, Select } from 'ionic-angular';
import { SessionPage } from './session-form';
import { SessionService } from '../../providers/session-service';
import { SessionDrills } from '../session-drills/session-drills';
import { _Session } from '../../models/_session';




/**
 * Generated class for the SessionList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'sessions',
  templateUrl: 'sessions.html',
})
export class Sessions {

  sessions:_Session[];
  type:string;

  constructor(private alertCtrl: AlertController,private popoverCtrl: PopoverController, private SessionServ:SessionService, public navCtrl: NavController,public navParams: NavParams) {
    //this.sessions = this.SessionServ.getSessions();
    
    this.SessionServ.sess.subscribe({
      next: data => this.sessions = data
    });
    this.SessionServ.load();
    this.type = navParams.get('type');
       
  }

  GoDrillList(sessionId:number,players:any[]){
    this.navCtrl.push(SessionDrills, {
       sessionId:sessionId,
       players: players
    });
  }

  newSession() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choix des joueurs');
    alert.addInput({
      type: 'checkbox',
      label: 'Joueur 1',
      value: 'Joueur 1',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Joueur 2',
      value: 'Joueur 2',
      checked: true
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
       this.GoDrillList(-1,data);
       console.log(data);
      }
    });
    alert.present();
  }
}
