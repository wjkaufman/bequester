import { Component, OnChanges, Input, Output,
  EventEmitter, SimpleChange } from '@angular/core';
  import { Holding } from '../holding';
  import { Bequest } from '../bequest';
  import  { Person } from '../person';
  import { HoldingService } from '../holding.service';
  import { BequestService } from '../bequest.service';
  import { PersonService } from '../person.service';

@Component({
  selector: 'app-holding-list',
  templateUrl: './holding-list.component.html',
  styleUrls: ['./holding-list.component.css']
})
export class HoldingListComponent implements OnChanges {
  
  @Input() personID;
  @Input() bequestID;
  holdings: Holding[];
  people: Person[];
  bequests: Bequest[];
  
  creatingHolding = false;
  
  getHoldings(): void {
    if (this.personID) {
      // get holdings for person
      this.holdingService.getPersonHoldings(this.personID)
        .then((res) => {
          this.holdings = res;
        })
        .catch((err) => {
          console.error(err);
        })
    } else if (this.bequestID) {
      this.holdingService.getBequestHoldings(this.bequestID)
        .then((res) => {
          this.holdings = res;
        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      // Do something if both personID and bequestID are null?
    }
  }
  
  getViewType(): string {
    if (this.personID) {
      return('person')
    } else if (this.bequestID) {
      return('bequest')
    } else {
      return('')
    }
  }
  
  constructor(private bequestService: BequestService,
              private personService: PersonService,
              private holdingService: HoldingService) { }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.getHoldings();
  }

}
