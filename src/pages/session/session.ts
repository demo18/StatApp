import { Stat } from '../stat/stat';

export class Session {
  constructor(
    public date: string,
    public context: string,
    public localID: number,
    public players:any[],
    public drills?:any[],
    public stats?:Stat[],
    public icon?: string,
    public title?: string,
    public note?: string
  ) {  }
}