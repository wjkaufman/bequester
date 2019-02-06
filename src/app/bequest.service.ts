import { Injectable } from '@angular/core';
import { Bequest } from './bequest';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class BequestService {
  
  private ipc: IpcRenderer;
  
  async getBequests() {
    return new Promise<Bequest[]>((resolve, reject) => {
      this.ipc.once('getBequestsResponse', (event, arg) => {
        console.log('in service, resolving arg...')
        resolve(arg);
      });
      this.ipc.send('getBequests');
    });
  }

  constructor() {
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
        console.log('success loading ipc thing');
        console.log(this.ipc);
      } catch (error) {
        throw error;
      }
    } else {
      console.warn('Could not load electron ipc');
    }
  }
}
