import { Stat } from '../stat/stat';

export class _Session {
  constructor(
    public date: string,
    public context: string,
    public players:any[],
    public drills?:any[],
    public icon?: string,
    public title?: string,
    public note?: string,
  ) {  }
}