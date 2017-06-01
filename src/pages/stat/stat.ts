import {Criteria} from'../criteria/criteria';

export class Stat {
  constructor(
    public player: string,
    public criteria: Criteria,
    public localID: number,
    public sessionID: number,
    public value,
    public icon?: string,
    public title?: string,
    public note?: string
  ) {  }
}