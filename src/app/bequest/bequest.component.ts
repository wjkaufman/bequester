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
    this.bequests = this.bequestService.getBequests();
  }

  constructor(private bequestService: BequestService) { }

  ngOnInit() {
    this.getBequests();
  }

}
