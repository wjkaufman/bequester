import { Component, Input, OnChanges,
  SimpleChange, ViewChild } from '@angular/core';
import { Bequest } from '../bequest';
import { Person } from '../person';
import { Holding } from '../holding';
import { HoldingListComponent } from '../holding-list/holding-list.component';
import { PersonService } from '../person.service';
import { HoldingService } from '../holding.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnChanges {
  
  @Input() person: Person;
  @ViewChild(HoldingListComponent) holdingList;
  editedPerson: Person;
  editing = false;
  
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
    // TODO fix this, figure out how to make the new holding creator
    // go away when you click away from the current bequest
    if (this.holdingList) {
      this.holdingList.creatingHolding = false;
    }
    this.editing = false;
  }

}
