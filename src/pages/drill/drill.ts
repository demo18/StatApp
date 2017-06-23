import { Component } from '@angular/core';
import { PopoverController,NavController, NavParams, AlertController,ActionSheetController } from 'ionic-angular';
import { SessionService } from '../../providers/session-service';
import { DrillService } from '../../providers/drill-service';
import { SessionDrill } from '../session-drill/session-drill';
import { DrillRename } from '../drill-rename/drill-rename';
import { CriteriaService } from '../../providers/criteria-service';
import { _Drill } from '../../models/_drill';
import { _Session } from '../../models/_session';
import { _Criteria } from '../../models/_criteria';
import { _Stat } from '../../models/_stat';


/**
 * Generated class for the StatForm page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'drill',
  templateUrl: 'drill.html',
})
export class Drill {

  session:_Session;
  sessionId:number;
  drill:_Drill;
  drillId:number;
  drillCriterias:_Criteria[];
  criterias:_Criteria[];

  constructor(public popoverCtrl: PopoverController,private CriteriaServ:CriteriaService,private alertCtrl: AlertController,private SessionServ:SessionService,private DrillServ:DrillService,public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController) {
    this.CriteriaServ.criteriaObs.subscribe({
      next: data => this.criterias = data
    });
    this.CriteriaServ.load();
    this.sessionId = navParams.get('sessionId');
    this.session = this.SessionServ.getSession(this.sessionId);
    this.drillId = navParams.get('drillId');
    
    //NEW DRILL
    if(this.drillId==-1){
      this.drill = new _Drill('NOM EXERCICE',[],[],'');
      this.rename();
    }
    //EXISTING DRILL
    else{
      this.drill = this.DrillServ.getDrill(this.drillId);
    }
    this.drillCriterias = this.drill.criterias;
    this.criterias = this.CriteriaServ.getCriterias();
  }

  addCriteria(){
    let alert = this.alertCtrl.create();
    alert.setTitle('SELECTIONNER UN CRITERE');
    alert.addInput({
      type: 'radio',
      label: 'NOUVEAU',
      value: 'NOUVEAU'
    });
    
    for(let i=0;i<this.criterias.length;i++){
      alert.addInput({
        type: 'radio',
        label: this.criterias[i].name,
        value: i.toString()
      });
    }
    alert.addButton('Annuler');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log(data);
        this.DrillServ.addCriteria(this.drillId,this.CriteriaServ.getCriteria(data));
      }
    });
    alert.present();
  }
  save(){
    //NEW DRILL
    if(this.drillId==-1){      
      this.drillId =  this.DrillServ.addDrill(this.drill);
    }
    //EXISTING DRILL
    else{
      this.DrillServ.updateDrill(this.drill,this.drillId);
    } 
  }

  // GoSessionDrill(drillId:number,drillName:string){
  //   this.save();
  //   this.navCtrl.push(SessionDrill, {
  //      sessionId: this.sessionId,
  //      drillName:drillName,
  //      drillId:drillId,
  //   });
  // }

  more() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [
        {
          text: 'Supprimer',
          icon:'trash',
          handler: () => {
            if(this.sessionId==-1){
              this.DrillServ.deleteDrill(this.drillId);
            }
            else{
              this.SessionServ.deleteDrill(this.sessionId,this.drillId);
            }
            this.navCtrl.pop();
          }
        },
        {
          text: 'Renommer',
          icon:'create',
          handler: () => {
            this.rename();
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

  rename() {
    // let alert = this.alertCtrl.create();
    // alert.setTitle('RENOMMER EXERCICE');
    // alert.addInput({
    //   placeholder: 'NOM EXERCICE'
    // });

    // alert.addInput({
    //   type: 'checkbox',
    //   label: 'RECCURENT',
    //   value: 'RECCURENT',
    //   checked: true
    // });

    // alert.addButton('Annuler');
    // alert.addButton({
    //   text: 'Ok',
    //   handler: data => {
    //     this.drill.name = data[0];
    //     this.save();
    //   }
    // });
    // alert.present();
    let popover = this.popoverCtrl.create(DrillRename,{},{cssClass: 'backdropOpacityPopover',showBackdrop: false, enableBackdropDismiss: false});
    console.log(this.navCtrl.getByIndex(this.navCtrl.length()-1).name);
      popover.present({});
      popover.onDidDismiss((data) => {
        console.log(data);
	      if(data==0){
          this.navCtrl.pop();
        }
        else{
          this.drill.name = data;
          this.save();
        }
      });
      
  }
  ionViewWillLeave() {
    if(this.sessionId!=-1){
      this.criterias = this.drill.criterias;
      for(var i=0; i<this.session.players.length; i++){
        for(var j=0; j<this.criterias.length; j++){
          this.drill.stats.push(new _Stat(this.session.players[i],this.criterias[j],0,0,0));
        }
      }
      this.SessionServ.addDrill(this.sessionId,this.drill);
    }
  }

}
