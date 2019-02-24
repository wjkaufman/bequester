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
  
  onSubmit(): void {
    console.log('form submitted!');
    console.log(this.bequest);
  }
  
  constructor(private holdingService: HoldingService) { }
  
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.getHoldings();
  }

  // ngOnInit() {
  //   this.getHoldings();
  // }

}
