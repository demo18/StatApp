import { Component, Inject } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, AlertController,ActionSheetController,ViewController } from 'ionic-angular';
import { SessionService } from '../../providers/session-service';
import { DrillService } from '../../providers/drill-service';
import { SessionDrill } from '../session-drill/session-drill';
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
  selector: 'drill-rename',
  templateUrl: 'drill-rename.html',
})
export class DrillRename {
  constructor(public navCtrl: NavController,public viewCtrl: ViewController,@Inject(FormBuilder) fb: FormBuilder) {
     this.form = fb.group({
      name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
    });
  }

  name:string;

  form:FormGroup;


  close() {
    this.viewCtrl.dismiss(0);
    console.log(this.form.valid);
  }
  ok() {
    this.viewCtrl.dismiss(this.name);
  }
 
}
