import { Component, OnInit } from '@angular/core';
import { Bequest } from '../bequest';
import { BequestService } from '../bequest.service';

@Component({
  selector: 'app-bequest',
  templateUrl: './bequest.component.html',
  styleUrls: ['./bequest.component.css']
})
export class BequestComponent implements OnInit {
  
  bequests: Bequest[];
  
  getBequests(): void {
    this.bequestService.getBequests()
      .then((res) => {
        this.bequests = res;
      })
      .catch((err) => {
        console.error('whoops, error here!');
        console.error(err)
      })
  }

  constructor(private bequestService: BequestService) { }

  ngOnInit() {
    this.getBequests();
  }

}
