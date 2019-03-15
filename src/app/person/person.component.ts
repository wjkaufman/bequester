import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Bequest } from '../bequest';
import { Person } from '../person';
import { Holding } from '../holding';
import { BequestService } from '../bequest.service';
import { PersonService } from '../person.service';
import { HoldingService } from '../holding.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnChanges {
  
  @Input() person: Person;
  holdings: Holding[];
  editedPerson: Person;
  editing = false;
  creatingHolding = false;
  newHolding: Holding;
  
  people: Person[];
  bequests: Bequest[];
  
  getPeopleAndBequests(): void {
    this.personService.getPeople()
      .then((res) => {
        this.people = res;
      })
      .catch((err) => {
        console.error(err);
      })
    this.bequestService.getBequests()
      .then((res) => {
        this.bequests = res;
      })
      .catch((err) => {
        console.error(err);
      })
  }
  
  // get holdings for person
  getHoldings(): void {
    this.holdingService.getPersonHoldings(this.person.personID)
      .then((res) => {
        this.holdings = res;
      })
      .catch((err) => {
        console.error(err);
      })
  }
  
  onEdit(): void {
    this.editing = !this.editing;
    if (this.editing) {
      this.editedPerson = new Person(this.person);
    }
  }
  
  onSubmitEdit(): void {
    this.personService.updatePerson(this.editedPerson)
      .then((res) => {
        this.person.set(this.editedPerson);
        this.editing = false;
      })
      .catch((err) => {
        console.error(err);
      })
  }
  
  onCreateHolding(): void {
    this.creatingHolding = !this.creatingHolding;
    if (this.creatingHolding) {
      this.newHolding = new Holding({holdingID: 0, personID: this.person.personID,
                                     bequestID: 0,
                                     dateStarted: (new Date())
                                                    .toISOString()
                                                    .substring(0,10), comment: ''});
      this.getPeopleAndBequests();
    }
  }
  
  onSubmitCreateHolding(): void {
    this.holdingService.createHolding(this.newHolding)
      .then((res) => {
        this.creatingHolding = false;
        this.getHoldings();
      })
      .catch((err) => {
        console.error(err);
      })
  }

  constructor(private bequestService: BequestService,
              private personService: PersonService,
              private holdingService: HoldingService) { }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.getHoldings()
  }

}
