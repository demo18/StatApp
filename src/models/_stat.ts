import {_Criteria} from'./_criteria';

export class _Stat {
  constructor(
    public player: string,
    public criteria: _Criteria,
    public localID: number,
    public sessionID: number,
    public value,
    public icon?: string,
    public title?: string,
    public note?: string
  ) {  }
}