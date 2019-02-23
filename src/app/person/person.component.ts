import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Person } from '../person';
import { Holding } from '../holding';
import { HoldingService } from '../holding.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnChanges {
  
  @Input() person: Person;
  holdings: Holding[];
  
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

  constructor(private holdingService: HoldingService) { }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.getHoldings()
  }

}
