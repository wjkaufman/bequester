import { Component, OnInit, Input } from '@angular/core';
import { Holding } from '../holding';

@Component({
  selector: 'app-holding',
  templateUrl: './holding.component.html',
  styleUrls: ['./holding.component.css']
})
export class HoldingComponent implements OnInit {
  
  @Input() holding: Holding;
  @Input() viewType: string; // will be either 'bequest' or 'person'

  constructor() { }

  ngOnInit() {
  }

}
