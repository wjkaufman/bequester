export class Bequest {
  bequestID: number;
  name: string;
  desc: string;
  dateCreated: Date
  
  constructor(b: Bequest) {
    this.set(b);
  }
  
  set(b: Bequest) {
    this.bequestID = b.bequestID;
    this.name = b.name;
    this.desc = b.desc;
    this.dateCreated = b.dateCreated;
  }
}
