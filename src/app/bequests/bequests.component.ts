import { Component, OnInit } from '@angular/core';
import { Bequest } from '../bequest';
import { BequestService } from '../bequest.service';
import { ActivatedRoute } from '@angular/router';

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
  deleting = false;
  
  getBequests(): Promise<void> {
    return this.bequestService.getBequests()
      .then((res) => {
        this.bequests = res;
      })
      .catch((err) => {
        console.error(err)
      });
  }
  
  onCreate() {
    this.creating = !this.creating;
    if (this.creating) {
      this.newBequest = new Bequest({bequestID: 0, name: 'New bequest',
                                     desc: 'New bequest description',
                                     isDeleted: false,
                                     dateCreated: (new Date())
                                                    .toISOString()
                                                    .substring(0,10)});
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
    this.selectedBequest = bequest;
  }
  
  onDelete(bequest: Bequest): void {
    bequest.isDeleted = true;
    this.bequestService.updateBequest(bequest)
      .then(res => {
        this.deleting = false;
        this.getBequests();
      })
      .catch(err => {
        console.error(err);
      })
  }

  onSearch(query: string) {
    if (query == '') {
      this.getBequests();
    } else {
      this.bequestService.getBequestsByString(query)
        .then(res => {
          this.bequests = res;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  constructor(private bequestService: BequestService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getBequests()
      .then(res => {
        this.route.params.subscribe(params => {
          if (params['bequestID']) {
            for (let b of this.bequests) {
              if (b.bequestID == +params['bequestID']) {
                this.selectedBequest = b;
                break;
              }
            }
          }
        })
      })
      .catch(err => {
        console.error(err);
      })
  }

}
