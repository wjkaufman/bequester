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
  newBequest: Bequest;
  creating = false;
  
  getBequests(): void {
    this.bequestService.getBequests()
      .then((res) => {
        this.bequests = res;
      })
      .catch((err) => {
        console.error(err)
      })
  }
  
  onCreate() {
    this.creating = !this.creating;
    if (this.creating) {
      this.newBequest = new Bequest({bequestID: 0, name: 'New bequest',
                                     desc: 'New bequest description',
                                     dateCreated: new Date()});
    }
  }
  
  onSubmit() {
    this.bequestService.createBequest(this.newBequest)
      .then((res) => {
        this.creating = false;
        this.getBequests();
      })
      .catch((err) => {
        console.error(err);
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
