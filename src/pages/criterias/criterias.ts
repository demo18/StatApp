import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,ActionSheetController } from 'ionic-angular';
import { CriteriaService } from '../../providers/criteria-service';
import { Criteria } from '../criteria/criteria';
import { _Criteria } from '../../models/_criteria';


/**
 * Generated class for the CriteriaList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'criterias',
  templateUrl: 'criterias.html',
})
export class Criterias {

  criterias:_Criteria[];

  constructor(private alertCtrl: AlertController,private CriteriaServ:CriteriaService,public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController) {
    this.CriteriaServ.criteriaObs.subscribe({
      next: data => this.criterias = data
    });
    this.CriteriaServ.load();
    

  }

  GoCriteriaPage(criteriaId:number,sessionId:number){
    this.navCtrl.push(Criteria, {
       sessionId: sessionId,
       criteriaId:criteriaId,
    });
  }

}
