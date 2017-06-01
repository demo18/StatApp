import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import {Session} from'../pages/session/session';
import {Stat} from'../pages/stat/stat';
import {Drill} from'../pages/drill/drill';
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

  sessions:Session[] = [];
  sess:any;
  sessionsObserver:any;

  addSession(session:Session){
    this.sessions.push(session);
    this.sessionsObserver.next(this.sessions);
    this.save();
  }
  updateSession(session:Session){
    this.sessions[session.localID-1] = session;
    this.sessionsObserver.next(this.sessions);
    this.save();
  }
  addStat(session:Session,stat:Stat){
    this.sessions[session.localID-1].stats.push(stat);
    this.sessionsObserver.next(this.sessions);
    this.save();
  }
  addDrill(session:Session,drill:Drill){
    drill.localID = this.sessions[session.localID-1].drills.length+1;  
    this.sessions[session.localID-1].drills.push(drill);
    this.sessionsObserver.next(this.sessions);
    this.save();
  }
  getSessions(){
    return this.sessions;
  }

  deleteSession(session:Session){
    this.sessions.splice(session.localID-1,1);
    this.sessionsObserver.next(this.sessions);
    this.save();
  }
  saveSession(session:Session){
    //NEW SESSION
    if(session.localID==0){
      session.localID = this.sessions.length+1;
      this.addSession(session);
    }
    //EXISTING SEESION
    else{
      this.updateSession(session);
    } 
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
            this.sessions = val;
            this.sessionsObserver.next(this.sessions);
          });
        }
      });
    });

  
    //return this.sessions;
  }

}
