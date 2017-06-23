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
export class SessionService {

  constructor(public http: Http, public storage: Storage) {
    this.sess = Observable.create(observer => {
      this.sessionsObserver = observer;
    });
        
  }

  sessions:_Session[] = [];
  sess:any;
  sessionsObserver:any;

  addSession(session:_Session):number{
    let id = this.sessions.push(session)-1;
    this.sessionsObserver.next(this.sessions);
    this.save();
    return id;
  }
  updateSession(session:_Session,id:number){
    this.sessions[id] = session;
    this.sessionsObserver.next(this.sessions);
    this.save();
  }

  addDrill(sessionId:number,drill:_Drill):number{ 
    let id = this.sessions[sessionId].drills.push(drill)-1;
    this.sessionsObserver.next(this.sessions);
    this.save();
    return id;
  }
  deleteDrill(sessionId:number,drillId:number){
    this.sessions[sessionId].drills.splice(drillId,1);
    this.sessionsObserver.next(this.sessions);
    this.save();
  }
  getSession(id:number){
    return this.sessions[id];
  }
  getSessions(){
    return this.sessions;
  }

  deleteSession(id:number){
    this.sessions.splice(id,1);
    this.sessionsObserver.next(this.sessions);
    this.save();
  }

  save(){
    this.storage.ready().then(() => {
      this.storage.set('sessions', this.sessions);
    });
  }
  load(){
    this.storage.ready().then(() => {
      this.storage.length().then((len) =>{
        if(len>0){
          this.storage.get('sessions').then((val) => {
            console.log('sessions:', val);
            if(val!=null){
              this.sessions = val;
            }
            else{
              this.sessions = [];
            }
            this.sessionsObserver.next(this.sessions);
          });
        }
      });
    });

  
    //return this.sessions;
  }

}
