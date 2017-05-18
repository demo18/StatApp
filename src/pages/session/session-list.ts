import { Component } from '@angular/core';
import { AlertController ,NavController,NavParams, PopoverController, Select } from 'ionic-angular';
import { SessionPage } from './session-form';
import { SessionService } from '../../providers/session-service';
import { DrillListPage } from '../drill/drill-list';

import {Session} from './session';




/**
 * Generated class for the SessionList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-session-list',
  templateUrl: 'session-list.html',
})
export class SessionListPage {

  sessions:Session[];
  type:string;

  constructor(private alertCtrl: AlertController,private popoverCtrl: PopoverController, private SessionServ:SessionService, public navCtrl: NavController,public navParams: NavParams) {
    //this.sessions = this.SessionServ.getSessions();
    
    this.SessionServ.sess.subscribe({
      next: data => this.sessions = data
    });
    this.SessionServ.load();
    this.type = navParams.get('type');
       
  }

  GoSessionPage(session:any){
    this.navCtrl.push(DrillListPage, {
       session: session
    });
  }

  newSession() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choix des joueurs');
    alert.addInput({
      type: 'checkbox',
      label: 'Joueur 1',
      value: 'Joueur 1'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Joueur 2',
      value: 'Joueur 2'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
       this.GoSessionPage(0);
      }
    });
    alert.present();
  }
}
