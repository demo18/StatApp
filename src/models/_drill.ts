import {_Criteria} from'./_criteria';
import {_Stat} from'./_stat';

export class _Drill {
  constructor(
    public name?: string,
    public criterias?:_Criteria[],
    public stats?:_Stat[],
    public note?: string
  ) {  }
}