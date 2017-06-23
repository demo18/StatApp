import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { _Criteria } from '../models/_criteria';
import { _Session } from '../models/_session';
import {Observable} from 'rxjs/Observable';
import { ValueTypeService } from './valueType-service';


/*
  Generated class for the SessionService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CriteriaService {

  constructor(private ValueTypeServ:ValueTypeService,public http: Http, public storage: Storage) {
    this.criteriaObs = Observable.create(observer => {
      this.criteriasObserver = observer;
    });
    this.criterias = [];
    console.log("criteria service contructeur");

  }

  criterias:_Criteria[] = [];
  criteriaObs:any;
  criteriasObserver:any;

  addCriteria(criteria:_Criteria):number{
    console.log(this.criterias); 
    let id = this.criterias.push(criteria)-1;
    //this.criteriasObserver.next(this.criterias);
    this.save();
    return id;
  }
  updateCriteria(criteria:_Criteria,criteriaId:number){
    this.criterias[criteriaId] = criteria;
    //this.criteriasObserver.next(this.criterias);
    this.save();
  }

  deleteCriteria(criteriaId:number){
    this.criterias.splice(criteriaId,1);
    //this.criteriasObserver.next(this.criterias);
    this.save();
  }
  getCriteria(id:number){
    return this.criterias[id];
  }
  getCriterias(){
    return this.criterias;
  }

  save(){
    this.storage.ready().then(() => {
      this.storage.set('criterias', this.criterias);
    });
  }
  load(){
    this.storage.ready().then(() => {
      this.storage.length().then((len) =>{
        //if(len>0){
          this.storage.get('criterias').then((val) => {
            console.log('criterias:', val);
            //criterias loading
            if(val!=null){
              this.criterias = val;
            }
            //criterias init
            else{
              this.criterias.push({name:"TEMPS",type:this.ValueTypeServ.getValueType("TEMPS")});
              this.criterias.push({name:"ELIMINE",type:this.ValueTypeServ.getValueType("OUI/NON")});
              this.save();
            }
            this.criteriasObserver.next(this.criterias);
          });
        //}
      });
    });

  }

}
