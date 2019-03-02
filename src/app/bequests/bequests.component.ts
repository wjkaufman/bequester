import { Component, OnInit } from '@angular/core';
import { Bequest } from '../bequest';
import { BequestService } from '../bequest.service';

@Component({
  selector: 'app-bequests',
  templateUrl: './bequests.component.html',
  styleUrls: ['./bequests.component.css']
})
export class BequestsComponent implements OnInit {
  
  bequests: Bequest[];
  selectedBequest: Bequest;
  
  getBequests(): void {
    this.bequestService.getBequests()
      .then((res) => {
        this.bequests = [];
        for (let b of res) {
          this.bequests.push(new Bequest(b));
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
  
  onSelect(bequest: Bequest) {
    if (this.selectedBequest == bequest) {
      this.selectedBequest = null;
    } else {
      this.selectedBequest = bequest;
    }
  }

  constructor(private bequestService: BequestService) { }

  ngOnInit() {
    this.getBequests();
  }

}
