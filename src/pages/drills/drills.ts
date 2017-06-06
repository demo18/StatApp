import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,ActionSheetController } from 'ionic-angular';
import { SessionService } from '../../providers/session-service';
import { DrillService } from '../../providers/drill-service';
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
  selector: 'drills',
  templateUrl: 'drills.html',
})
export class Drills {

  drills:_Drill[];

  constructor(private alertCtrl: AlertController,private DrillServ:DrillService,public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController) {
    this.DrillServ.drillObs.subscribe({
      next: data => this.drills = data
    });
    this.DrillServ.load();
    

  }

  GoDrillPage(drillId:number,sessionId:number){
    this.navCtrl.push(Drill, {
       sessionId: sessionId,
       drillId:drillId,
    });
  }


}
