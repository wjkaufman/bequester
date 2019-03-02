export class Person {
  personID: number;
  firstname: string;
  lastname: string;
  position: string;
  gradYear: number;
  
  constructor(p: Person) {
    this.set(p);
  }
  
  set(p: Person): void {
    this.personID = p.personID;
    this.firstname = p.firstname;
    this.lastname = p.lastname;
    this.position = p.position;
    this.gradYear = p.gradYear;
  }
}
