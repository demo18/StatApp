import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,ActionSheetController } from 'ionic-angular';
import { SessionService } from '../../providers/session-service';
import { CriteriaService } from '../../providers/criteria-service';
import { SessionDrill } from '../session-drill/session-drill';
import { _Drill } from '../../models/_drill';
import { _Session } from '../../models/_session';
import { _Criteria } from '../../models/_criteria';
import { _Stat } from '../../models/_stat';


/**
 * Generated class for the CriteriaList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'criteria',
  templateUrl: 'criteria.html',
})
export class Criteria {

session:_Session;
  sessionId:number;
  criteria:_Criteria;
  criteriaId:number;
  criterias:_Criteria[];

  constructor(private alertCtrl: AlertController,private SessionServ:SessionService,private CriteriaServ:CriteriaService,public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController) {
    this.sessionId = navParams.get('sessionId');
    this.session = this.SessionServ.getSession(this.sessionId);
    this.criteriaId = navParams.get('criteriaId');
    
    //NEW CRITERIA
    if(this.criteriaId==-1){
      this.criteria = new _Criteria('NOM CRITERE','nombre');
      this.save();
      this.rename();
    }
    //EXISTING CRITERIA
    else{
      this.criteria = this.CriteriaServ.getCriteria(this.criteriaId);
    }
    
  }

  addCriteria(){

  }
  save(){
    //NEW CRITERIA
    if(this.criteriaId==-1){     
      this.criteriaId =  this.CriteriaServ.addCriteria(this.criteria);
    }
    //EXISTING CRITERIA
    else{
      this.CriteriaServ.updateCriteria(this.criteria,this.criteriaId);
    } 
  }



  more() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [
        {
          text: 'Supprimer',
          icon:'trash',
          handler: () => {
            if(this.sessionId==-1){
              this.CriteriaServ.deleteCriteria(this.criteriaId);
            }
            else{
              //this.SessionServ.deleteCriteria(this.sessionId,this.criteriaId);
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
    let alert = this.alertCtrl.create();
    alert.setTitle('RENOMMER EXERCICE');
    alert.addInput({
      placeholder: 'NOM EXERCICE'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'RECCURENT',
      value: 'RECCURENT',
      checked: true
    });

    alert.addButton('Annuler');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        this.criteria.name = data[0];
        this.save();
      }
    });
    alert.present();
  }



}
