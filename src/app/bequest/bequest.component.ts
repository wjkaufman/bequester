import { Component, Input, OnChanges,
  SimpleChange, ViewChild } from '@angular/core';
import { Person } from '../person';
import { Bequest } from '../bequest';
import { Holding } from '../holding';
import { HoldingListComponent } from '../holding-list/holding-list.component';
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
  @ViewChild(HoldingListComponent) holdingList;
  editing = false;
  editedBequest: Bequest;
  
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
    if (this.holdingList) {
      this.holdingList.creatingHolding = false;
    }
    this.editing = false;
  }
}
