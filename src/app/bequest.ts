export class Bequest {
  bequestID: number;
  name: string;
  desc: string;
  dateCreated: Date;
  isDeleted: boolean;
  
  constructor(b: any) {
    this.set(b);
  }
  
  set(b: any): void {
    this.bequestID = b.bequestID;
    this.name = b.name;
    this.desc = b.desc;
    this.dateCreated = b.dateCreated;
  }
}
