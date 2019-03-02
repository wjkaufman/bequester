import { Component, OnInit, Input } from '@angular/core';
import { Bequest } from '../bequest';
import { Person } from '../person';
import { Holding } from '../holding';
import { BequestService } from '../bequest.service';
import { PersonService } from '../person.service';
import { HoldingService } from '../holding.service';


@Component({
  selector: 'app-holding',
  templateUrl: './holding.component.html',
  styleUrls: ['./holding.component.css']
})
export class HoldingComponent implements OnInit {
  
  @Input() holding: Holding;
  @Input() viewType: string; // will be either 'bequest' or 'person'
  editing = false;
  editedHolding: Holding;
  people: Person[];
  bequests: Bequest[];
  
  logMe(): void {
    console.log('logging it...')
    console.log(this.holding)
    console.log(this.editedHolding)
  }
  
  onEdit(): void {
    this.editing = !this.editing;
    if (this.editing) {
      this.editedHolding = new Holding(this.holding);
      
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
  }
  
  onSubmit(): void {
    this.holdingService.updateHolding(this.editedHolding)
      .then((res) => {
        this.holding.set(this.editedHolding);
        // TODO figure out how to refresh the page?!?!?!?
        this.editing = false;
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
