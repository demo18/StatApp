import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { _Drill } from '../models/_drill';
import { _Session } from '../models/_session';
import { _Criteria } from '../models/_criteria';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the SessionService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DrillService {

  constructor(public http: Http, public storage: Storage) {
    this.drillObs = Observable.create(observer => {
      this.drillsObserver = observer;
    });
    console.log("drill service contructeur");
  }

  drills:_Drill[] = [];
  drillObs:any;
  drillsObserver:any;

  addDrill(drill:_Drill):number{
    console.log(this.drills); 
    let id = this.drills.push(drill)-1;
    //this.drillsObserver.next(this.drills);
    this.save();
    return id;
  }
  addCriteria(drillId:number,criteria:_Criteria):number{
    let id = this.drills[drillId].criterias.push(criteria)-1;
    //this.drillsObserver.next(this.drills);
    this.save();
    return id;
  }
  updateDrill(drill:_Drill,drillId:number){
    this.drills[drillId] = drill;
    //this.drillsObserver.next(this.drills);
    this.save();
  }

  deleteDrill(drillId:number){
    this.drills.splice(drillId,1);
    //this.drillsObserver.next(this.drills);
    this.save();
  }
  getDrill(id:number){
    return this.drills[id];
  }
  getDrillByName(name:string){
    for(let i=0;i<this.drills.length;i++){
      if(this.drills[i].name==name){
        return this.drills[i];
      }
    }
  }
  getDrills(){
    return this.drills;
  }

  save(){
    this.storage.ready().then(() => {
      this.storage.set('drills', this.drills);
    });
  }
  load(){
    this.storage.ready().then(() => {
      this.storage.length().then((len) =>{
        if(len>0){
          this.storage.get('drills').then((val) => {
            console.log('drills:', val);
            if(val!=null){
              this.drills = val;
            }
            else{
              this.drills = [];
            }
            this.drillsObserver.next(this.drills);
          });
        }
      });
    });

  
    //return this.sessions;
  }

}
