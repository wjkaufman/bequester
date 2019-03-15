import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Person } from '../person';
import { Bequest } from '../bequest';
import { Holding } from '../holding';
import { BequestService } from '../bequest.service';
import { PersonService } from '../person.service';
import { HoldingService } from '../holding.service';

@Component({
  selector: 'app-bequest',
  templateUrl: './bequest.component.html',
  styleUrls: ['./bequest.component.css']
})
export class BequestComponent implements OnChanges {
  
  @Input() bequest: Bequest;
  editing = false;
  editedBequest: Bequest;
  holdings: Holding[];
  creatingHolding = false;
  newHolding: Holding;
  
  people: Person[];
  bequests: Bequest[];
  
  getHoldings(): void {
    this.holdingService.getBequestHoldings(this.bequest.bequestID)
      .then((res) => {
        this.holdings = res;
      })
      .catch((err) => {
        console.error(err)
      })
  }
  
  onEdit(): void {
    this.editing = !this.editing;
    if (this.editing) {
      this.editedBequest = new Bequest(this.bequest);
    }
  }
  
  onSubmit(): void {
    this.bequestService.updateBequest(this.editedBequest)
      .then((res) => {
        this.bequest.set(this.editedBequest);
        this.editing = false;
      })
      .catch((err) => {
        console.error(err)
      })
  }
  
  constructor(private bequestService: BequestService,
              private holdingService: HoldingService) { }
  
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.creatingHolding = false;
    this.editing = false;
    this.getHoldings();
  }
}
