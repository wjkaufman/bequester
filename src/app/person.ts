export class Person {
  personID: number;
  firstname: string;
  lastname: string;
  position: string;
  gradYear: number;
  isDeleted: boolean;
  
  constructor(p: any) {
    this.set(p);
  }
  
  set(p: any): void {
    this.personID = p.personID;
    this.firstname = p.firstname;
    this.lastname = p.lastname;
    this.position = p.position;
    this.gradYear = p.gradYear;
    this.isDeleted = p.isDeleted;
  }
}
