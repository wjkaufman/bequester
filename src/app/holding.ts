export class Holding {
  holdingID: number;
  personID: number;
  bequestID: number;
  dateStarted: Date;
  comment: string;
  // other information not stored in holdings table
  firstname: string;
  lastname: string;
  name: string;
  dateCreated: string;
  
  constructor(h: any) {
    this.set(h);
  }
  
  set(h: any): void {
    this.holdingID = h.holdingID;
    this.personID = h.personID;
    this.bequestID = h.bequestID;
    this.dateStarted = h.dateStarted;
    this.comment = h.comment;
    this.firstname = h.firstname;
    this.lastname = h.lastname;
    this.name = h.name;
    this.dateCreated = h.dateCreated;
  }
}
