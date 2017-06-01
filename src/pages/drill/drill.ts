import {Criteria} from'../criteria/criteria';
import {Stat} from'../stat/stat';

export class Drill {
  constructor(
    public localID?: number,
    public title?: string,
    public criterias?:Criteria[],
    public stats?:Stat[],
    public note?: string
  ) {  }
}