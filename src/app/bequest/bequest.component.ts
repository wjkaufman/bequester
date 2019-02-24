import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Bequest } from '../bequest';
import { Holding } from '../holding';
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
    console.log('form submitted!');
    
    // TODO make call to update server
    
    this.bequest = this.editedBequest;
    this.editing = false;
  }
  
  constructor(private holdingService: HoldingService) { }
  
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.getHoldings();
    this.editing = false;
  }

  // ngOnInit() {
  //   this.getHoldings();
  // }

}
