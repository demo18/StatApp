import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { _ValueType } from '../models/_valueType';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the SessionService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ValueTypeService {

  constructor(public http: Http, public storage: Storage) {
    this.valueTypes.push({name:"OUI/NON",choices:["OUI","NON"]});
    this.valueTypes.push({name:"PENALITE",choices:["1 FOR 1","2 FOR 1","3 FOR 1"]});
    this.valueTypes.push({name:"NOMBRE",choices:[]});
    this.valueTypes.push({name:"TEMPS",choices:[]});
    console.log("valueType service contructeur");
    console.log(this.valueTypes);

  }

  valueTypes:_ValueType[] = [];

  getValueTypes(){
    return this.valueTypes;
  }

  getValueType(name:string){
    for(let i=0;i<this.valueTypes.length;i++){
      if(this.valueTypes[i].name==name){
        return this.valueTypes[i];
      }
    }
  } 

}
