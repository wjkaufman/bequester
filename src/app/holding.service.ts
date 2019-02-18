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
        resolve(arg);
      });
      this.ipc.send('getBequestHoldings', bequestID);
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
