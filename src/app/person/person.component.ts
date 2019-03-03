import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Person } from '../person';
import { Holding } from '../holding';
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
  
  onSubmit(): void {
    this.personService.updatePerson(this.editedPerson)
      .then((res) => {
        this.person.set(this.editedPerson);
        this.editing = false;
      })
      .catch((err) => {
        console.error(err);
      })
  }

  constructor(private personService: PersonService,
              private holdingService: HoldingService) { }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.getHoldings()
  }

}
