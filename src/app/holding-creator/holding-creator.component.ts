import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Holding } from '../holding';
import { Bequest } from '../bequest';
import  { Person } from '../person';
import { HoldingService } from '../holding.service';
import { BequestService } from '../bequest.service';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-holding-creator',
  templateUrl: './holding-creator.component.html',
  styleUrls: ['./holding-creator.component.css']
})
export class HoldingCreatorComponent implements OnInit {
  
  holding: Holding;
  bequests: Bequest[];
  people: Person[];
  @Input() personID: number = 0;
  @Input() bequestID: number = 0;
  @Input() creating = false;
  @Output() creatingChange = new EventEmitter();
  @Output() created = new EventEmitter();
  
  getPeopleAndBequests(): void {
    this.personService.getPeople()
      .then((res) => {
        // sort by last name, then first name
        this.people = res.sort((a,b) => {
          return (a.lastname + a.firstname).localeCompare(b.lastname + b.firstname);
        });
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
  
  onCreate(): void {
    this.creating = !this.creating;
    this.creatingChange.emit(this.creating);
    if (this.creating) {
      this.holding = new Holding({holdingID: 0, personID: this.personID,
                                     bequestID: this.bequestID,
                                     dateStarted: (new Date())
                                                    .toISOString()
                                                    .substring(0,10),
                                    comment: '', isDeleted: 0});
      this.getPeopleAndBequests();
    }
  }
  
  onSubmit(): void {
    this.holdingService.createHolding(this.holding)
      .then((res) => {
        this.creating = false;
        this.creatingChange.emit(this.creating);
        this.created.emit();
      })
      .catch((err) => {
        console.error(err);
      })
  }

  constructor(private bequestService: BequestService,
              private personService: PersonService,
              private holdingService: HoldingService) { }

  ngOnInit() {
  }

}
