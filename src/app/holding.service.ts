import { Injectable } from '@angular/core';
import { Holding } from './holding';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class HoldingService {
  
  private ipc: IpcRenderer;
  
  async getBequestHoldings(bequestID: number) {
    return new Promise<Holding[]>((resolve, reject) => {
      this.ipc.once('getBequestHoldingsResponse', (event, arg) => {
        let holdings: Holding[] = [];
        for (let h of arg) {
          holdings.push(new Holding(h));
        }
        resolve(holdings);
      });
      this.ipc.send('getBequestHoldings', bequestID);
    })
  }
  
  async getPersonHoldings(personID: number) {
    return new Promise<Holding[]>((resolve, reject) => {
      this.ipc.once('getPersonHoldingsResponse', (event, arg) => {
        let holdings: Holding[] = [];
        for (let h of arg) {
          holdings.push(new Holding(h));
        }
        resolve(holdings);
      });
      this.ipc.send('getPersonHoldings', personID);
    })
  }
  
  async updateHolding(holding: Holding) {
    return new Promise((resolve, reject) => {
      this.ipc.once('updateHoldingResponse', (event, arg) => {
        resolve(arg);
      });
      this.ipc.send('updateHolding', holding);
    })
  }

  constructor() {
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
      } catch (error) {
        throw error;
      }
    } else {
      console.warn('Could not load electron ipc');
    }
  }
}
