import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { _Drill } from '../models/_drill';
import { _Session } from '../models/_session';
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
    
  }

  drills:_Drill[] = [];
  drillObs:any;
  drillsObserver:any;

  addDrill(drill:_Drill):number{
    let id = this.drills.push(drill)-1;
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
  getdrill(id:number){
    return this.drills[id];
  }
  getdrills(){
    return this.drills;
  }

  deletedrill(id:number){
    this.drills.splice(id,1);
    //this.drillsObserver.next(this.drills);
    this.save();
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
            this.drills = val;
            this.drillsObserver.next(this.drills);
          });
        }
      });
    });

  
    //return this.sessions;
  }

}
