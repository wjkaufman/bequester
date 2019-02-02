import { Component, OnInit } from '@angular/core';
import { Bequest } from '../bequest';

@Component({
  selector: 'app-bequest',
  templateUrl: './bequest.component.html',
  styleUrls: ['./bequest.component.css']
})
export class BequestComponent implements OnInit {
  
  bequest: Bequest = {
    id: 1,
    name: 'H150 betting shirt',
    description: '',
    dateCreated: new Date('2019-01-01')
  }

  constructor() { }

  ngOnInit() {
  }

}
