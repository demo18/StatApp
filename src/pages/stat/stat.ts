export class Stat {
  constructor(
    public player: string,
    public criteria: string,
    public localID: number,
    public sessionID: number,
    public value,
    public icon?: string,
    public title?: string,
    public note?: string
  ) {  }
}