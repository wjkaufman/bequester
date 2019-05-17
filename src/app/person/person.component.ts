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
    this.personService.getPersonBequests(this.person)
      .then((res) => {
        this.bequestList = res;
        // now get lineages for each bequest
        for (let b of this.bequestList) {
          this.holdingService.getBequestHoldings(b.bequestID)
            .then((res) => {
              for (var j=0, b; b = this.bequestList[j]; j++) {
                if (b.bequestID == res[0].bequestID) {
                   this.bequestList[j].holdings = res;
                }
              }
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
    this.onGetBequestList();
    
    if (this.holdingList) {
      this.holdingList.creatingHolding = false;
    }
    this.editing = false;
  }

}
