import { Component, OnInit, Input } from '@angular/core';
import { Bequest } from '../bequest';

@Component({
  selector: 'app-bequest',
  templateUrl: './bequest.component.html',
  styleUrls: ['./bequest.component.css']
})
export class BequestComponent implements OnInit {
  
  @Input() bequest: Bequest;
  
  // getBequests(): void {
  //   this.bequestService.getBequests()
  //     .then((res) => {
  //       this.bequests = res;
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }

  constructor() { } // private bequestService: BequestService

  ngOnInit() {
    // this.getBequests();
  }

}
