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
  
  onSubmitEdit(): void {
    this.bequestService.updateBequest(this.editedBequest)
      .then((res) => {
        this.bequest.set(this.editedBequest);
        this.editing = false;
      })
      .catch((err) => {
        console.error(err)
      })
  }
  
  onCreateHolding(): void {
    this.creatingHolding = !this.creatingHolding;
    if (this.creatingHolding) {
      this.newHolding = new Holding({holdingID: 0, personID: 0,
                                     bequestID: this.bequest.bequestID,
                                     dateStarted: Date(), comment: ''});
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
    this.getHoldings();
    this.editing = false;
  }
}
