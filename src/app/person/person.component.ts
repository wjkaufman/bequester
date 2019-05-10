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
  // for displaying all bequests and lineages for each bequest
  bequestList: any[];
  
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
  
  onGetBequestList(): void {
    console.log('getting bequest list...')
    this.personService.getPersonBequests(this.person)
      .then((res) => {
        this.bequestList = res;
        console.log('finished getting bequest list')
        console.log(res)
        console.log('now getting lineages for each bequest')
        // now get lineages for each bequest
        for (var i=0, b; b = this.bequestList[i]; i++) {
          console.log(b);
          this.holdingService.getBequestHoldings(b.bequestID)
            .then((res) => {
              // line below isn't working, TODO to fix...
              console.log(`problem area, i=${i}`);
              console.log(this.bequestList);
              this.bequestList[i].holdings = res;
              console.log('apparently got the holdings for bequest');
              console.log(res);
            })
        }
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
