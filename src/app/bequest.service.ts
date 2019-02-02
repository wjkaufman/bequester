import { Injectable } from '@angular/core';
import { Bequest } from './bequest';
import { Database } from 'sqlite3';
import { BEQUESTS } from './mock-bequests';

@Injectable({
  providedIn: 'root'
})
export class BequestService {
  
  getBequests(): Bequest[] {
    
    // TODO logic to get bequests from server
    
    return BEQUESTS;
  }

  constructor() {
    
  }
}
